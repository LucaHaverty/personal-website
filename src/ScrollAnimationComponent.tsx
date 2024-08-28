import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const ScrollAnimationComponent = () => {
    const { ref, inView } = useInView({ triggerOnce: true })

    return (
        <div style={{ height: "200vh", padding: "100px 20px" }}>
            {/* Use padding or margin to space out elements */}
            <div ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: "50vh" }} // Add space to allow scrolling
                >
                    <h2>Scroll to animate me!</h2>
                </motion.div>
            </div>
        </div>
    )
}

export default ScrollAnimationComponent
