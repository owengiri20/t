import { Box, makeStyles, useMediaQuery } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import React, { useEffect, useState } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import "./App.css"
import Logo from "./assets/logo.png"
import Moon from "./assets/moon.png"

import { AuthButton } from "./components/AuthButton"
import UserMenu from "./components/UserMenu"
import { useAuth } from "./containers/auth"
import { COLOURS } from "./game/CommonStyles"
import { AuthPage } from "./pages/AuthPage"
import { GamePage } from "./pages/GamePage"
import { ProfilePage } from "./pages/PlayerProfile"
import { AdminPage } from "./pages/AdminPage"
import TTButton from "./common/TTButton"
import GitHubIcon from "@mui/icons-material/GitHub"
import { LeaderboardPage } from "./pages/LeaderboardPage"
import { useGame } from "./containers/game"

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
        padding: ".5rem",
        fontWeight: "bold",
        background: COLOURS.lightBrown,
        display: "flex",
        alignItems: "center",
    },
})

function App() {
    const classes = useStyles()
    const history = useHistory()
    const GAME = useGame()

    // check me here
    const { user } = useAuth()

    return (
        <>
            <Box className={classes.inDevelopment}>
                <GitHubIcon sx={{ mr: ".2rem" }} />
                <a href="https://github.com/owengiri20/tt" rel="noreferrer" target="_blank">
                    Github Repo
                </a>
            </Box>
            <Container maxWidth={"xl"} style={{ width: "100%", maxWidth: "1400px", transform: "scale(.85)", height: "70vh" }}>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        onClick={() => {
                            if (GAME.GAME_STATE.status !== "playing") {
                                GAME.resetState()
                            }

                            history.push("/")
                        }}
                        className={classes.logo}
                    >
                        <img src={Logo} alt="TrekTyper Logo" height={"60px"} />
                        <Box sx={{ fontSize: "22px" }}>TrekTyper</Box>
                    </Box>

                    <Box display={"flex"}>
                        <TTButton
                            onClick={() => {
                                history.push("/leaderboard")
                            }}
                            sx={{
                                marginRight: "1rem",
                                padding: "1rem",
                            }}
                        >
                            Leaderboard
                        </TTButton>

                        {user ? (
                            <UserMenu user={user} />
                        ) : (
                            <AuthButton onClick={() => history.push("/auth?page=login")} style={{ cursor: "pointer" }} classes={classes.logo} />
                        )}
                    </Box>
                </Box>

                <Switch>
                    <Route path="/" component={GamePage} exact />
                    <Route path="/auth" component={AuthPage} exact />
                    <Route path="/profile/:playerID" component={ProfilePage} exact />
                    <Route path="/admin" component={AdminPage} exact />
                    <Route path="/leaderboard" component={LeaderboardPage} exact />
                </Switch>
            </Container>
            <Box
                style={{
                    position: "absolute",
                    bottom: "1rem",
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
    )
}

export default App
