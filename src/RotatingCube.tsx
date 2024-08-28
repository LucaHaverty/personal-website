import React, { useRef, useMemo, useCallback, useState } from "react"
import { useThree } from "@react-three/fiber"
import { Mesh, TextureLoader, CanvasTexture, Raycaster, Vector2 } from "three"

const RotatingCube: React.FC = () => {
    const cubeRef = useRef<Mesh>(null!)
    const planeRef = useRef<Mesh>(null!)
    const { size, camera } = useThree()
    const [raycaster] = useState(() => new Raycaster())
    const [mouse] = useState(() => new Vector2())
    const [isHover, setIsHover] = useState(false)

    // Load a texture (image) for one side of the cube
    const textureLoader = new TextureLoader()
    const texture = textureLoader.load("path/to/your/image.jpg") // Replace with your image path

    // Create a canvas and draw text and other HTML content onto it
    const canvasTexture = useMemo(() => {
        const canvas = document.createElement("canvas")
        canvas.width = 512 // Increase resolution for better quality
        canvas.height = 512
        const ctx = canvas.getContext("2d")

        if (ctx) {
            // Draw background
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw text
            ctx.font = "Bold 48px Arial"
            ctx.fillStyle = "#000"
            ctx.fillText("Project Title", 20, 100)

            ctx.font = "24px Arial"
            ctx.fillText("Short description of the project. Showcase your work here.", 20, 150)

            // Draw button with default style
            ctx.fillStyle = "#007bff"
            ctx.fillRect(20, 200, 200, 50)

            ctx.fillStyle = "#fff"
            ctx.font = "Bold 24px Arial"
            ctx.fillText("View Project", 45, 235)
        }

        return new CanvasTexture(canvas)
    }, [])

    // Function to update canvas for hover effect
    const updateCanvasForHover = useCallback(() => {
        const canvas = canvasTexture.image
        const ctx = canvas.getContext("2d")

        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Redraw background
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Redraw text
            ctx.font = "Bold 48px Arial"
            ctx.fillStyle = "#000"
            ctx.fillText("Project Title", 20, 100)

            ctx.font = "24px Arial"
            ctx.fillText("Short description of the project. Showcase your work here.", 20, 150)

            // Draw button with hover effect
            ctx.fillStyle = isHover ? "#0056b3" : "#007bff" // Darker color for hover
            ctx.fillRect(20, 200, 200, 50)

            ctx.fillStyle = "#fff"
            ctx.font = "Bold 24px Arial"
            ctx.fillText("View Project", 45, 235)

            canvasTexture.needsUpdate = true
        }
    }, [canvasTexture, isHover])

    /* // Rotate the cube on each frame
    useFrame(() => {
        cubeRef.current.rotation.x += 0.01
        cubeRef.current.rotation.y += 0.01
    }) */

    // Handle pointer events
    const handlePointerMove = useCallback(
        (event: any) => {
            mouse.x = (event.clientX / size.width) * 2 - 1
            mouse.y = -(event.clientY / size.height) * 2 + 1

            raycaster.setFromCamera(mouse, camera)

            const intersects = raycaster.intersectObject(planeRef.current)
            if (intersects.length > 0) {
                const uv = intersects[0].uv

                if (uv == undefined) throw new Error("uv isn't defined")

                const canvasX = uv.x * canvasTexture.image.width
                const canvasY = (1 - uv.y) * canvasTexture.image.height

                const hover = canvasX >= 20 && canvasX <= 220 && canvasY >= 200 && canvasY <= 250
                if (hover !== isHover) {
                    setIsHover(hover)
                    updateCanvasForHover()
                }
            } else if (isHover) {
                setIsHover(false)
                updateCanvasForHover()
            }
        },
        [raycaster, mouse, size, camera, isHover, updateCanvasForHover]
    )

    // Handle click events on the plane
    const handlePointerUp = useCallback(
        (event: any) => {
            mouse.x = (event.clientX / size.width) * 2 - 1
            mouse.y = -(event.clientY / size.height) * 2 + 1

            raycaster.setFromCamera(mouse, camera)

            const intersects = raycaster.intersectObject(planeRef.current)
            if (intersects.length > 0) {
                const intersect = intersects[0]
                const uv = intersect.uv

                if (uv) {
                    const canvasX = uv.x * canvasTexture.image.width
                    const canvasY = (1 - uv.y) * canvasTexture.image.height

                    if (canvasX >= 20 && canvasX <= 220 && canvasY >= 200 && canvasY <= 250) {
                        window.open("https://your-project-link.com", "_blank")
                    }
                }
            }
        },
        [canvasTexture, raycaster, mouse, size, camera]
    )

    return (
        <mesh ref={cubeRef}>
            {/* Cube geometry */}
            <boxGeometry args={[1, 1, 1]} />
            {/* Material for each face of the cube */}
            <meshStandardMaterial attach="material-0" color="orange" />
            <meshStandardMaterial attach="material-1" color="blue" />
            <meshStandardMaterial attach="material-2" color="green" />
            <meshStandardMaterial attach="material-3" color="red" />
            {/* Apply the texture to one face */}
            <meshStandardMaterial attach="material-4" map={texture} />
            <meshStandardMaterial attach="material-5" color="purple" />

            {/* Add a plane for the text/image side of the cube */}
            <mesh
                ref={planeRef}
                position={[0, 0, 0.51]}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial map={canvasTexture} transparent />
            </mesh>
        </mesh>
    )
}

export default RotatingCube
