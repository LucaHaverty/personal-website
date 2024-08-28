import React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Globe from "./Globe"

const StartingPoint: React.FC = () => {
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Canvas>
                {/* Add ambient light */}
                <ambientLight intensity={2} />
                {/* Add directional light */}
                <directionalLight position={[10, 10, 5]} intensity={1} />
                {/* Add the rotating cube */}
                <Globe />
                {/* Controls to rotate and zoom the scene */}
                <OrbitControls enableZoom={true} />
            </Canvas>
        </div>
    )
}

export default StartingPoint
