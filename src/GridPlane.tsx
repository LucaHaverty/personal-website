import React from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"

const GridPlane: React.FC = () => {
    // Load the grid texture using the useLoader hook
    const gridTexture = useLoader(THREE.TextureLoader, "textures/grid.png")

    // Set texture properties to repeat
    gridTexture.wrapS = THREE.RepeatWrapping
    gridTexture.wrapT = THREE.RepeatWrapping
    gridTexture.repeat.set(2, 2)

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            {/* Plane geometry with width and height of 10 */}
            <planeGeometry args={[10, 10]} />
            {/* Material with the grid texture applied, changing color using the color property */}
            <meshBasicMaterial map={gridTexture} transparent={true} opacity={0.02} />
        </mesh>
    )
}

export default GridPlane
