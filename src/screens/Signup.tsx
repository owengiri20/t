import React from "react"
import { Layout } from "./Layout"
import { Box, Button, ButtonGroup, TextField, makeStyles } from "@material-ui/core"
import { COLOURS } from "../game/CommonStyles"

const useStyles = makeStyles({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
    },

    innerBox: {
        border: "2px solid " + COLOURS.lightBrown,
        height: "90%",
        width: "60%",
        display: "flex",
        // justifyContent: "center",
        borderRadius: "10px",
        flexDirection: "column",
        alignContent: "center",
    },

    switchBtn: {
        background: "transparent",
        color: "white",
        border: "1px solid " + COLOURS.lightBrown,
        outline: "0",
        borderRadius: "10px",
        width: "8rem",
    },
    formGroup: {
        paddingLeft: "1rem",
        paddingRight: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
})
export const Signup = () => {
    const classes = useStyles()

    return (
        <Layout>
            <Box className={classes.container}>
                <Box className={classes.innerBox}>
                    {/* switch buttons */}
                    <ButtonGroup style={{ height: "4rem", marginTop: "1rem", display: "flex", justifyContent: "center" }} variant="outlined">
                        <Button className={classes.switchBtn}>Login</Button>
                        <Button className={classes.switchBtn}>Register</Button>
                    </ButtonGroup>

                    <Box className={classes.formGroup}>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="filled"
                            placeholder="example@mail.com"
                            style={{ marginTop: "1rem", marginBottom: "1.5rem", width: "90%" }}
                            InputLabelProps={{
                                style: { color: "white" },
                            }}
                            InputProps={{
                                style: {
                                    color: "white",
                                },
                                inputProps: {
                                    style: {
                                        color: "white",
                                    },
                                },
                            }}
                        />
                        <TextField
                            style={{ width: "90%", marginBottom: "1.5rem" }}
                            id="outlined-basic"
                            label="Password"
                            variant="filled"
                            placeholder="****"
                            InputLabelProps={{
                                style: { color: "white" },
                            }}
                            InputProps={{
                                style: {
                                    color: "white",
                                },
                                inputProps: {
                                    style: {
                                        color: "white",
                                    },
                                },
                            }}
                        />

                        <TextField
                            style={{ width: "90%", marginBottom: "1.5rem" }}
                            id="outlined-basic"
                            label="Confirm Password"
                            variant="filled"
                            placeholder="****"
                            InputLabelProps={{
                                style: { color: "white" },
                            }}
                            InputProps={{
                                style: {
                                    color: "white",
                                },
                                inputProps: {
                                    style: {
                                        color: "white",
                                    },
                                },
                            }}
                        />

                        <Button
                            style={{
                                marginTop: "1rem",
                                backgroundColor: COLOURS.darkishBrown,
                                color: "white",
                                borderRadius: "10px",
                                width: "33%",
                                height: "fit-content",
                                padding: "1rem",
                            }}
                            variant="contained"
                        >
                            Create Account!
                        </Button>
                        <Box style={{ height: ".1rem", width: "10rem", background: "white", marginTop: ".5rem", marginBottom: ".5rem" }} />

                        <Button
                            style={{
                                backgroundColor: COLOURS.darkishBrown,
                                color: "white",
                                borderRadius: "10px",
                                width: "43%",
                                height: "fit-content",
                                padding: "1rem",
                            }}
                            variant="contained"
                        >
                            Already have an account? Login Instead
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Layout>
    )
}
