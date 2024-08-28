import { Sphere, useTexture } from "@react-three/drei"
import { Vector3, Matrix4, Euler, MeshStandardMaterial } from "three"
import { CylinderGeometry } from "three"
import { extend } from "@react-three/fiber"

extend({ CylinderGeometry })

const Pin: React.FC<{ position: Vector3 }> = ({ position }) => {
    function vector3ToEulerLookingAtOrigin(vector: Vector3): Euler {
        // Calculate the direction vector to the origin
        const direction = vector.clone().normalize()

        // Create a matrix to hold the transformation
        const matrix = new Matrix4()

        // Look at the origin
        const forward = new Vector3(0, 1, 0)

        matrix.lookAt(forward, direction, new Vector3(0, 1, 0))

        // Convert the matrix to Euler angles
        const euler = new Euler().setFromRotationMatrix(matrix, "XYZ")

        return euler
    }

    const material = new MeshStandardMaterial({
        color: 0xeeffee, // Bright green color
        roughness: 0.9, // Medium roughness
        metalness: 0.7, // Slightly metallic
        emissive: 0x111111, // Low-level emissive glow
        emissiveIntensity: 0.2, // Intensity of the emissive color
    })

    return (
        <mesh position={position} rotation={vector3ToEulerLookingAtOrigin(position)}>
            <cylinderGeometry args={[0.05, 0.1, 0.2, 32]} />
            {/* <Sphere args={[0.01]} /> */}
            <primitive object={material} attach="material" />
            {/*             <meshStandardMaterial color="orange" roughness={0.5} metalness={0.1} />
             */}
        </mesh>
    )
}

const Globe: React.FC = () => {
    const texture = useTexture("/globetex.png") // Ensure texture is in public folder

    // Convert geographic coordinates to 3D coordinates
    /*     const lat = 45.52 // Latitude for Portland
    const lon = -122.67 // Longitude for Portland */

    const radius = 2 // Radius of the globe
    /* const phi = 0.7763224512870778 // Latitude to polar angle
    const theta = 1.000597260168349 // Longitude to azimuthal angle */
    const phi = 0.77224512870778 // Latitude to polar angle
    const theta = 2.13597260168349 // Longitude to azimuthal angle

    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)

    const portlandPosition = new Vector3(x, y, z)

    return (
        <>
            <Sphere args={[1, 32, 32]} scale={2}>
                <meshStandardMaterial map={texture} />
            </Sphere>
            <Pin position={portlandPosition} />
        </>
    )
}

export default Globe
