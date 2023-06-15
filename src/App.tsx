import { Box } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import React from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"
import Logo from "./assets/logo.png"
import { AppWrapper } from "./common/appWrapper"
import { GameScreen } from "./screens/GameScreen"
import { COLOURS } from "./game/style"

function App() {
    return (
        <AppWrapper>
            <Container maxWidth={"xl"} style={{ maxWidth: "1200px", transform: "scale(.8)" }}>
                <Box
                    style={{
                        marginTop: "2rem",
                        display: "flex",
                        padding: "1rem",
                        alignItems: "center",
                        borderRadius: "30px",
                        background: "#0A0603",
                        color: COLOURS.lightBrown,
                        width: "fit-content",
                    }}
                >
                    <img src={Logo} alt="TrekTyper Logo" height={"80px"} />
                    <Box sx={{ fontSize: "30px" }}>TrekTyper</Box>
                </Box>
                <Switch>
                    <Route path="/" component={GameScreen} exact />
                </Switch>
            </Container>
        </AppWrapper>
    )
}

export default App
