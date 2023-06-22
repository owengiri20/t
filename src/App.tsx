import { Box, makeStyles, useMediaQuery } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import React, { useEffect } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import "./App.css"
import Logo from "./assets/logo.png"
import Moon from "./assets/moon.png"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { AppWrapper } from "./common/appWrapper"
import { useAuth } from "./containers/auth"
import { COLOURS } from "./game/CommonStyles"
import { AuthPage } from "./screens/Auth"
import { GameScreen } from "./screens/GameScreen"
import { AuthButton } from "./components/AuthButton"
import UserMenu from "./components/UserMenu"

export const useStyles = makeStyles({
    logo: {
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        borderRadius: "30px",
        background: COLOURS.darkBrown,
        color: COLOURS.lightBrown,
        width: "fit-content",
    },
    inDevelopment: {
        position: "absolute",
        top: 0,
        right: "0",
        margin: "0",
        padding: "1rem",
        background: COLOURS.lightBrown,
    },
})

function App() {
    const under1100Height = useMediaQuery("(max-height:1100px)")
    const classes = useStyles()
    const history = useHistory()

    // check me here
    const { user } = useAuth()

    return (
        <AppWrapper>
            <>
                <Box className={classes.inDevelopment}>
                    <a href="https://github.com/owengiri20/tt" rel="noreferrer" target="_blank">
                        {"<In Development/>"}
                    </a>
                </Box>
                <Container maxWidth={"xl"} style={{ maxWidth: "1200px", transform: under1100Height ? "scale(.7)" : "scale(.9)" }}>
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box style={{ marginTop: under1100Height ? "0" : "2rem" }} className={classes.logo}>
                            <img src={Logo} alt="TrekTyper Logo" height={"80px"} />
                            <Box sx={{ fontSize: "30px" }}>TrekTyper</Box>
                        </Box>

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

                    <Switch>
                        <Route path="/" component={GameScreen} exact />
                        <Route path="/auth" component={AuthPage} exact />
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
                        <a href="https://owengiri.dev/" rel="noreferrer" target="_blank">
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
