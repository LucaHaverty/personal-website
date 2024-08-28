import React, { useRef } from "react"
import { Box, Container, Typography, Button, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import ThreeScene from "./ThreeScene"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import Header from "./Header"

// const LandingContainer = styled(Container)({
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     //textAlign: "center",
//     position: "relative",
//     marginTop: "64px", // Adjusted to account for header height
// })

const SectionContainer = styled(Container)({
    padding: "100px 0",
    textAlign: "center",
    minHeight: "100vh",
})

const ArrowButton = styled(IconButton)({
    position: "absolute",
    color: "#ff4081", // Using theme color
    bottom: 30,
})

const LandingPage: React.FC = () => {
    const landingRef = useRef<HTMLDivElement | null>(null)
    const aboutRef = useRef<HTMLDivElement | null>(null)
    const projectsRef = useRef<HTMLDivElement | null>(null)
    const contactRef = useRef<HTMLDivElement | null>(null)

    const scrollToSection = (sectionId: string) => {
        switch (sectionId) {
            case "landing":
                landingRef.current?.scrollIntoView({ behavior: "smooth" })
                break
            case "about":
                aboutRef.current?.scrollIntoView({ behavior: "smooth" })
                break
            case "projects":
                projectsRef.current?.scrollIntoView({ behavior: "smooth" })
                break
            case "contact":
                contactRef.current?.scrollIntoView({ behavior: "smooth" })
                break
            default:
                break
        }
    }

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            <Header scrollToSection={scrollToSection} />
            <SectionContainer ref={landingRef}>
                <Typography variant="h2" color="primary" gutterBottom>
                    Welcome
                </Typography>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    I'm Luca Haverty, a Developer, Designer, and Creator
                </Typography>
                {/*  <Box marginTop={4}>
                    <Button variant="contained" color="primary" size="large">
                        Get in Touch
                    </Button>
                </Box> */}
                <Box display="flex" justifyContent="center">
                    <ArrowButton onClick={scrollToAbout}>
                        <KeyboardArrowDownIcon fontSize="large" />
                    </ArrowButton>
                </Box>
            </SectionContainer>

            {/* About Section */}
            <SectionContainer ref={aboutRef}>
                <Typography variant="h3" color="primary" gutterBottom>
                    About Me
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    Hello! I'm John Doe, a passionate software developer with a love for creating innovative solutions
                    and stunning digital experiences. With over 5 years of experience in web development, I specialize
                    in building high-performance applications using the latest technologies.
                </Typography>
                <ThreeScene />
            </SectionContainer>

            {/* Projects Section */}
            <SectionContainer ref={projectsRef}>
                <Typography variant="h3" color="primary" gutterBottom>
                    Projects
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    I've worked on various projects ranging from full-stack web applications to mobile apps and
                    open-source contributions. Each project reflects my dedication to creating efficient and
                    maintainable code and my ability to adapt to new technologies and frameworks.
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    Some notable projects include a task management app built with React and Node.js, an e-commerce
                    platform with a custom-built CMS, and a social media analytics tool developed using Python and
                    Django.
                </Typography>
            </SectionContainer>

            {/* Contact Section */}
            <SectionContainer ref={contactRef}>
                <Typography variant="h3" color="primary" gutterBottom>
                    Contact
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    I'm always open to new opportunities and collaborations! If you're interested in working together or
                    just want to say hello, feel free to reach out via email or connect with me on LinkedIn.
                </Typography>
                <Button variant="outlined" color="primary" href="lucahaverty@gmail.com">
                    Email Me
                </Button>
            </SectionContainer>
        </>
    )
}

export default LandingPage
