import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import Globe from './Globe';

const CustomControls = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    if (gl.toneMapping !== undefined) {
      gl.toneMapping = THREE.ACESFilmicToneMapping;
    }

    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;

    camera.position.set(0, 0, 8);
  }, [camera, gl]);

  return (
    <OrbitControls
      enablePan={true}
      enableZoom={false}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
      rotateSpeed={0.7}
    />
  );
};

const ThreeScene = () => {
  return (
    <Canvas
      style={{ height: '750px' }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      shadows
      dpr={window.devicePixelRatio}
    >
      <Suspense fallback={null}>
        <Globe />
        <CustomControls />
      </Suspense>
    </Canvas>
  );
};

export default ThreeScene;
