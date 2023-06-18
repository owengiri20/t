import { Box, useMediaQuery } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import React from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"
import Logo from "./assets/logo.png"
import { AppWrapper } from "./common/appWrapper"
import { GameScreen } from "./screens/GameScreen"
import { COLOURS } from "./game/CommonStyles"

function App() {
    const under1100Height = useMediaQuery("(max-height:1100px)")
    console.log(under1100Height)

    return (
        <AppWrapper>
            <>
                <Box style={{ position: "absolute", top: 0, right: "0", margin: "0", padding: "1rem", background: COLOURS.lightBrown }}>
                    <a href="https://github.com/owengiri20/tt" target="_blank">
                        {"<In Development/>"}
                    </a>
                </Box>
                <Container maxWidth={"xl"} style={{ maxWidth: "1200px", transform: under1100Height ? "scale(.7)" : "scale(.9)" }}>
                    <Box
                        style={{
                            marginTop: under1100Height ? "0" : "2rem",
                            display: "flex",
                            padding: "1rem",
                            alignItems: "center",
                            borderRadius: "30px",
                            background: COLOURS.darkBrown,
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
                <Box
                    style={{
                        position: "absolute",
                        bottom: "0",
                        width: "99%",
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: "1rem",
                    }}
                >
                    <Box style={{ color: COLOURS.lightBrown, cursor: "pointer" }}>
                        <a href="https://owengiri.dev/" target="_blank">
                            © 2023 Owen Giri
                        </a>
                    </Box>
                </Box>
            </>
        </AppWrapper>
    )
}

export default App
