import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { TextureLoader, Vector3, Euler, Matrix4, MeshStandardMaterial, AdditiveBlending } from 'three';

const Pin: React.FC<{ position: Vector3 }> = ({ position }) => {
    function vector3ToEulerLookingAtOrigin(vector: Vector3): Euler {
        const direction = vector.clone().normalize();
        const matrix = new Matrix4();
        const forward = new Vector3(0, 1, 0);
        matrix.lookAt(forward, direction, new Vector3(0, 1, 0));
        const euler = new Euler().setFromRotationMatrix(matrix, "XYZ");
        return euler;
    }

    const redMaterial = useMemo(() => new MeshStandardMaterial({
        color: '#A10D00',
        roughness: 0.5,
        metalness: 0.2,
    }), []);

    const silverMaterial = useMemo(() => new MeshStandardMaterial({
        color: '#aaa',
        roughness: 0.5,
        metalness: 0.1,
    }), []);

    const pinHeight = 0.25;

    return (
        <group position={position} rotation={vector3ToEulerLookingAtOrigin(position)}>
            <mesh>
                <cylinderGeometry args={[0.01, 0.001, pinHeight, 64]} />
                <primitive object={silverMaterial} attach="material" />
            </mesh>
            <mesh position={[0, pinHeight / 2, 0]}>
                <sphereGeometry args={[0.03, 32, 32]} />
                <primitive object={redMaterial} attach="material" />
            </mesh>
        </group>
    );
};

interface GlobeProps {
    atmosphereHeight?: number;
    atmosphereIntensity?: number;
}

const Globe: React.FC<GlobeProps> = ({ 
    atmosphereHeight = 0.2,
    atmosphereIntensity = 4
}) => {
    const earthTexture = useLoader(TextureLoader, '/textures/earth.jpg');
    const earthSpecular = useLoader(TextureLoader, '/textures/earth_specular.png');
    const normalMap = useLoader(TextureLoader, '/textures/earth_normal.png');
    const cloudsTexture = useLoader(TextureLoader, '/textures/clouds.jpg');

    const globeRef = useRef<THREE.Mesh>(null);
    const cloudRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);

    const earthRadius = 2;
    const atmosphereRadius = earthRadius + atmosphereHeight;

    const earthMaterial = useMemo(() => new THREE.MeshPhongMaterial({
        map: earthTexture,
        specularMap: earthSpecular,
        normalMap: normalMap,
        specular: new THREE.Color(0x888888),
        shininess: 10,
    }), [earthTexture, earthSpecular, normalMap]);

    const earthGeometry = useMemo(() => new THREE.SphereGeometry(earthRadius, 64, 64), []);
    const cloudGeometry = useMemo(() => new THREE.SphereGeometry(earthRadius + 0.01, 64, 64), []);
    const atmosphereGeometry = useMemo(() => new THREE.SphereGeometry(atmosphereRadius, 64, 64), [atmosphereRadius]);

    const cloudMaterial = useMemo(() => new MeshStandardMaterial({
        map: cloudsTexture,
        blending: AdditiveBlending,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        side: THREE.DoubleSide,
        color: '#ffffff',
        emissive: '#000000',
        emissiveIntensity: 0.05,    
    }), [cloudsTexture]);

    const atmosphereMaterial = useMemo(() => new THREE.ShaderMaterial({
        uniforms: {
            atmosphereIntensity: { value: atmosphereIntensity }
        },
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            uniform float atmosphereIntensity;
            void main() {
                float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), atmosphereIntensity);
                gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
            }
        `,
        side: THREE.BackSide,
        blending: AdditiveBlending,
        transparent: true
    }), [atmosphereIntensity]);

    const tiltX = new Euler(0, 0, Math.PI / 6);
    const tiltY = new Euler(Math.PI / 6.5, 0, 0);

    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.x = tiltY.x;
            globeRef.current.rotation.y = tiltX.z;
            globeRef.current.rotation.z = 0;

            if (cloudRef.current) {
                cloudRef.current.rotation.y += 0.0001;
            }

            if (atmosphereRef.current) {
                atmosphereRef.current.rotation.copy(globeRef.current.rotation);
            }
        }
    });

    const radius = 2;
    const phi = 0.77224512870778;
    const theta = 2.13597260168349;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    const portlandPosition = new Vector3(x, y, z);

    return (
        <group>
            <mesh ref={atmosphereRef} geometry={atmosphereGeometry} material={atmosphereMaterial} />
            <mesh ref={globeRef} geometry={earthGeometry} material={earthMaterial}>
                <Pin position={portlandPosition} />
            </mesh>
            <mesh ref={cloudRef} geometry={cloudGeometry} material={cloudMaterial} />
            <ambientLight intensity={0.05} />
            <directionalLight
                position={[5, 5, 5]} 
                intensity={1.2}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
            />
        </group>
    );
};

export default Globe;