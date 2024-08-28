import React from "react"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import LandingPage from "./LandingPage"

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#ff4081",
        },
        background: {
            default: "#121212",
        },
    },
})

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LandingPage />
        </ThemeProvider>
    )
}

export default App
