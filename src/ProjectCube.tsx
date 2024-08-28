import { useEffect, useRef } from "react"
import * as THREE from "three"

const ProjectCube = () => {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mountRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const aspect = window.innerWidth / window.innerHeight
        const camera = new THREE.OrthographicCamera(
            -10 * aspect, // left
            10 * aspect, // right
            10, // top
            -10, // bottom
            0.1, // near
            1000 // far
        )
        camera.position.z = 10 // Set an appropriate z position

        // Renderer setup with alpha for transparency
        const renderer = new THREE.WebGLRenderer({
            antialias: true, // Enable antialiasing
            alpha: true, // Enable transparency
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio) // Improve quality on high-DPI displays
        renderer.setClearColor(0x000000, 0) // Set clear color to black with 0 alpha (transparent)

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement)
        }

        // Basic lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 8) // Soft white light
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(1, 1, 1).normalize()
        scene.add(directionalLight)

        // Add a cube
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshStandardMaterial({
            color: 0xeeffee, // Bright green color
            roughness: 0.9, // Medium roughness
            metalness: 0.7, // Slightly metallic
            emissive: 0x111111, // Low-level emissive glow
            emissiveIntensity: 0.2, // Intensity of the emissive color
        })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate)

            // cube.rotation.x += 0.01
            // cube.rotation.y += 0.01

            renderer.render(scene, camera)
        }
        animate()

        // Clean up on component unmount
        return () => {
            mountRef.current?.removeChild(renderer.domElement)
        }
    }, [])

    return <div ref={mountRef} />
}

export default ProjectCube
