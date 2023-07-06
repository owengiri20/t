import { Box, makeStyles, useMediaQuery } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import React, { useEffect, useState } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import "./App.css"
import Logo from "./assets/logo.png"
import Moon from "./assets/moon.png"

import { AppWrapper } from "./common/appWrapper"
import { AuthButton } from "./components/AuthButton"
import UserMenu from "./components/UserMenu"
import { useAuth } from "./containers/auth"
import { COLOURS } from "./game/CommonStyles"
import { AuthPage } from "./pages/AuthPage"
import { GameScreen } from "./pages/GamePage"
import { ProfilePage } from "./pages/PlayerProfile"
import { AdminPage } from "./pages/AdminPage"
import TTButton from "./common/TTButton"
import { Leaderboard } from "@mui/icons-material"
import GitHubIcon from "@mui/icons-material/GitHub"
import { LeaderboardPage } from "./pages/LeaderboardPage"

export const useStyles = makeStyles({
    logo: {
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        borderRadius: "20px",
        background: COLOURS.darkBrown,
        color: COLOURS.lightBrown,
        width: "fit-content",
        cursor: "pointer",
        userSelect: "none",
    },
    inDevelopment: {
        position: "absolute",
        top: 0,
        right: "0",
        margin: "0",
        padding: "1rem",
        fontWeight: "bold",
        background: COLOURS.lightBrown,
        display: "flex",
        alignItems: "center",
    },
})

function App() {
    const under1100Height = useMediaQuery("(max-height:1100px)")
    const under800Height = useMediaQuery("(max-height:800px)")

    const getScale = () => {
        // if (under800Height) {
        //     return "scale(.65)"
        // }
        if (under1100Height) {
            return "scale(.7)"
        }
     
        return "scale(1)"
    }

    const classes = useStyles()
    const history = useHistory()

    // check me here
    const { user } = useAuth()

    return (
        <AppWrapper>
            <>
                <Box className={classes.inDevelopment}>
                    <GitHubIcon sx={{ mr: ".2rem" }} />
                    <a href="https://github.com/owengiri20/tt" rel="noreferrer" target="_blank">
                        {"IN DEVELOPMENT"}
                    </a>
                </Box>
                <Container maxWidth={"xl"} style={{ width: "100%", maxWidth: "1400px", transform: getScale() }}>
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box onClick={() => history.push("/")} style={{ marginTop: under1100Height ? "-1rem" : "2rem" }} className={classes.logo}>
                            <img src={Logo} alt="TrekTyper Logo" height={"70px"} />
                            <Box sx={{ fontSize: "25px" }}>TrekTyper</Box>
                        </Box>

                        <Box display={"flex"}>
                            <TTButton
                                onClick={() => {
                                    history.push("/leaderboard")
                                }}
                                sx={{
                                    marginTop: under1100Height ? "0" : "2rem",
                                    marginRight: "1rem",
                                    padding: "1rem",
                                }}
                            >
                                Leaderboard
                            </TTButton>

                            {user ? (
                                <UserMenu user={user} />
                            ) : (
                                <AuthButton
                                    onClick={() => history.push("/auth?page=login")}
                                    style={{ marginTop: under1100Height ? "0" : "2rem", cursor: "pointer" }}
                                    classes={classes.logo}
                                />
                            )}
                        </Box>
                    </Box>

                    <Switch>
                        <Route path="/" component={GameScreen} exact />
                        <Route path="/auth" component={AuthPage} exact />
                        <Route path="/profile/:playerID" component={ProfilePage} exact />
                        <Route path="/admin" component={AdminPage} exact />
                        <Route path="/leaderboard" component={LeaderboardPage} exact />
                    </Switch>
                </Container>
                <Box
                    style={{
                        position: "absolute",
                        bottom: "-3rem",
                        width: "99%",
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: "1rem",
                    }}
                >
                    <Box style={{ color: COLOURS.lightBrown, background: COLOURS.darkBrown, padding: ".5rem", borderRadius: "7px", cursor: "pointer" }}>
                        <a tabIndex={-1} href="https://owengiri.dev/" rel="noreferrer" target="_blank">
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
