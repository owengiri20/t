import { Box, createMuiTheme, ThemeProvider } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import React from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"
import { AppWrapper } from "./common/appWrapper"
import { Game } from "./game"
import { useStyles } from "./game/style"
import { GameScreen } from "./screens/GameScreen"
import Logo from "./assets/logo.png"

const theme = createMuiTheme({
    palette: {},
})
function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppWrapper>
                <Container maxWidth={"xl"} style={{ maxWidth: "1200px", transform: "scale(1)" }}>
                    <Box
                        style={{
                            marginTop: "2rem",
                            display: "flex",
                            padding: "1rem",
                            alignItems: "center",
                            borderRadius: "30px",
                            background: "#0A0603",
                            color: "#AA8270",
                            width: "fit-content",
                        }}
                    >
                        <img src={Logo} alt="" height={"80px"} />
                        <Box sx={{ fontSize: "30px" }}>TrekTyper</Box>
                    </Box>
                    <Switch>
                        <Route path="/" component={GameScreen} exact />
                    </Switch>
                </Container>
            </AppWrapper>
        </ThemeProvider>
    )
}

export default App
