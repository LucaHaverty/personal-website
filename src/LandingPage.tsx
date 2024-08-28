import React, { useRef } from "react"
import { Box, Container, Typography, Button, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import ThreeScene from "./ThreeScene"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import Header from "./Header"

const LandingContainer = styled(Container)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    position: "relative",
    marginTop: "64px", // Adjusted to account for header height
})

const SectionContainer = styled(Container)({
    padding: "100px 0",
    textAlign: "center",
    minHeight: "100vh",
})

const ArrowButton = styled(IconButton)({
    position: "absolute",
    bottom: "80px",
    color: "#ff4081", // Using theme color
})

const LandingPage: React.FC = () => {
    const landingRef = useRef<HTMLDivElement | null>(null)
    const aboutRef = useRef<HTMLDivElement | null>(null)
    const projectsRef = useRef<HTMLDivElement | null>(null)
    const experienceRef = useRef<HTMLDivElement | null>(null)
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
            case "experience":
                experienceRef.current?.scrollIntoView({ behavior: "smooth" })
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
            <LandingContainer ref={landingRef}>
                <Typography variant="h2" color="primary" gutterBottom>
                    Welcome to My Personal Website
                </Typography>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    I'm a Developer, Designer, and Creator
                </Typography>
                <Box mt={4}>
                    <Button variant="contained" color="primary" size="large">
                        Get in Touch
                    </Button>
                </Box>
                <ArrowButton onClick={scrollToAbout}>
                    <KeyboardArrowDownIcon fontSize="large" />
                </ArrowButton>
            </LandingContainer>

            {/* About Section */}
            <SectionContainer ref={aboutRef}>
                <Typography variant="h3" color="primary" gutterBottom>
                    About Me
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    Hello! I'm John Doe, a passionate software developer with a love for creating innovative solutions
                    and stunning digital experiences. With over 5 years of experience in web development, I specialize
                    in building high-performance applications using the latest technologies. My journey began with a
                    fascination for how technology can solve real-world problems, and I've since dedicated myself to
                    mastering the art of programming.
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    When I'm not coding, you can find me exploring new places, experimenting with different cuisines, or
                    capturing moments through my lens. I'm always on the lookout for new challenges and opportunities to
                    collaborate with like-minded individuals who share a passion for technology and creativity.
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

            {/* Experience Section */}
            <SectionContainer ref={experienceRef}>
                <Typography variant="h3" color="primary" gutterBottom>
                    Experience
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    I have experience working in a range of environments, from startups to large corporations. Over the
                    years, I've had the opportunity to work in different roles, including front-end developer, back-end
                    developer, and full-stack developer. This diverse background has given me a well-rounded skill set
                    and the ability to tackle various challenges.
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    My most recent experience was at XYZ Company, where I led a team of developers in building scalable
                    web applications and integrating third-party services.
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
                <Button variant="outlined" color="primary" href="mailto:john.doe@example.com">
                    Email Me
                </Button>
            </SectionContainer>
        </>
    )
}

export default LandingPage
