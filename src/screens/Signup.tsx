import React, { useState } from "react"
import { Layout } from "./Layout"
import { Box, Button, ButtonGroup, TextField, makeStyles } from "@material-ui/core"
import { COLOURS } from "../game/CommonStyles"
import { useAuth } from "../containers/auth"

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

interface FormVals {
    email: string
    password: string
    confirmPassword: string
}

export const Signup = ({ togglePage }: { togglePage: (path: string) => void }) => {
    const classes = useStyles()
    const { signUpFn } = useAuth()

    // form vals, may change to react-hook-forms in the future
    const [formVals, setFormVals] = useState<FormVals>({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleSignup = () => {
        if (!formVals.email) {
            console.log("email empty")
            return
        }

        if (!formVals.password) {
            console.log("password empty")
            return
        }

        if (!formVals.confirmPassword) {
            console.log("confirm password empty")
            return
        }

        if (formVals.password !== formVals.confirmPassword) {
            console.log("password and confirm passwords do not match")
            return
        }

        signUpFn.mutate({ email: formVals.email, password: formVals.password, confirmPassword: formVals.confirmPassword })
    }

    return (
        <Box className={classes.formGroup}>
            <TextField
                onChange={(e) => setFormVals((prev) => ({ ...prev, email: e.target.value }))}
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
                onChange={(e) => setFormVals((prev) => ({ ...prev, password: e.target.value }))}
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

            <TextField
                onChange={(e) => setFormVals((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                className={classes.root}
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
                    onClick={handleSignup}
                >
                    Signup
                </Button>
                <Box style={{ height: ".1rem", width: "10rem", background: "white", marginTop: ".5rem", marginBottom: ".5rem" }} />
                <Button
                    onClick={() => togglePage("login")}
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
                    Already Signed up? Login
                </Button>
            </Box>
        </Box>
    )
}
