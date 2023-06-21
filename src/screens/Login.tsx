import React from "react"
import { Layout } from "./Layout"
import { Box, Button, ButtonGroup, TextField, makeStyles } from "@material-ui/core"
import { COLOURS } from "../game/CommonStyles"

const useStyles = makeStyles({
    switchBtn: {
        background: "transparent",
        color: "white",
        border: "1px solid " + COLOURS.lightBrown,
        outline: "0",
        borderRadius: "10px",
        width: "8rem",
    },
    formGroup: {
        height: "100%",
        width: "100%",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
    },

    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
        },
        "& .MuiOutlinedInput-input": {
            color: "white",
        },
        "& .MuiInputLabel-outlined": {
            color: "white",
        },
    },
})
export const Login = ({ togglePage }: { togglePage: (path: string) => void }) => {
    const classes = useStyles()

    return (
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
                className={classes.root}
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
                classes={{}}
            />

            <Box style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", position: "absolute", bottom: "1rem" }}>
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
                    Login
                </Button>
                <Box style={{ height: ".1rem", width: "10rem", background: "white", marginTop: ".5rem", marginBottom: ".5rem" }} />
                <Button
                    onClick={() => togglePage("signup")}
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
                    Dont have an account? Sign up
                </Button>
            </Box>
        </Box>
    )
}
