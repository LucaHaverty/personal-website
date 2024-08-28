import React from "react"
import { AppBar, Toolbar, Button } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledAppBar = styled(AppBar)({
    backgroundColor: "rgba(100, 100, 100, .1)", // Transparent with some opacity
    backdropFilter: "blur(10px)", // Blur effect
    position: "fixed",
    boxShadow: "rgba(0, 0, 0, .5) 0px 5px 15px",
    top: 0,
})
const HeaderButton = styled(Button)({
    "color": "#ffffff",
    "textTransform": "none", // Keep text normal case
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight hover effect
    },
})

const Divider = styled("span")({
    color: "#ffffff",
    margin: "0 10px",
})

interface HeaderProps {
    scrollToSection: (sectionId: string) => void
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
    return (
        <StyledAppBar>
            <Toolbar sx={{ justifyContent: "center" }}>
                <HeaderButton onClick={() => scrollToSection("landing")}>Home</HeaderButton>
                <Divider>|</Divider>
                <HeaderButton onClick={() => scrollToSection("about")}>About</HeaderButton>
                <Divider>|</Divider>
                <HeaderButton onClick={() => scrollToSection("projects")}>Projects</HeaderButton>
                <Divider>|</Divider>
                <HeaderButton onClick={() => scrollToSection("contact")}>Contact</HeaderButton>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header
