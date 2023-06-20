import { Box, useMediaQuery } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import React from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"
import Logo from "./assets/logo.png"
import Moon from "./assets/moon.png"

import { AppWrapper } from "./common/appWrapper"
import { GameScreen } from "./screens/GameScreen"
import { COLOURS } from "./game/CommonStyles"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

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
                            display: "flex",
                            justifyContent: "space-between",
                            alignContent: "center",
                        }}
                    >
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

                        <Box
                            onClick={() => window.alert("coming soon!")}
                            style={{
                                marginTop: under1100Height ? "0" : "2rem",
                                display: "flex",
                                padding: "1rem",
                                alignItems: "center",
                                borderRadius: "30px",
                                background: COLOURS.darkBrown,
                                color: COLOURS.lightBrown,
                                width: "fit-content",
                                cursor: "pointer",
                            }}
                        >
                            <AccountCircleIcon style={{ marginRight: "1rem", color: COLOURS.lightBrown, fontSize: "35px", cursor: "pointer" }} />
                            <Box sx={{ fontSize: "20px" }}>Sign in</Box>
                        </Box>
                    </Box>

                    <Switch>
                        <Route path="/" component={GameScreen} exact />
                        <Route path="/signin" component={GameScreen} exact />
                        <Route path="/signup" component={GameScreen} exact />
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
                    <Box style={{ color: COLOURS.lightBrown, background: COLOURS.darkBrown, padding: ".5rem", borderRadius: "7px", cursor: "pointer" }}>
                        <a href="https://owengiri.dev/" target="_blank">
                            © 2023 Owen Giri
                        </a>
                    </Box>

                    <img style={{ position: "absolute", zIndex: -99, height: "70vh", bottom: "-40vh" }} src={Moon} alt="TrekTyper Logo" height={"80px"} />
                </Box>
            </>
        </AppWrapper>
    )
}

export default App
