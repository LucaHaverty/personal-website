import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Globe from "./Globe"
import { Box } from "@mui/material"

/* const Model = () => {
    const { nodes, materials } = useGLTF("/models/text.glb")
    return <primitive object={nodes.Scene} material={materials.Material} />
} */

const ThreeScene: React.FC = () => {
    return (
        <Box display="flex" justifyContent="center">
            <Canvas style={{ height: "50vh" }}>
                <ambientLight intensity={2} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Suspense fallback={null}>
                    <Globe />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </Box>
    )
}

export default ThreeScene
