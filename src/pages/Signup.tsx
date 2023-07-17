import { Box, Button, IconButton, InputAdornment, TextField, makeStyles, useMediaQuery } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { Alert } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useAuth } from "../containers/auth"
import { COLOURS } from "../game/CommonStyles"
import { getErrorMessge } from "../utils"

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
    const [showPassword, setShowPassword] = useState(false)
    const { signUpFn } = useAuth()
    const shorterScreen = useMediaQuery("(max-height:850px)")

    // form vals, may change to react-hook-forms in the future
    const [formVals, setFormVals] = useState<FormVals>({
        email: "",
        password: "",
        confirmPassword: "",
    })

    // error state
    const [errorMsg, setErrorMsg] = useState("")
    useEffect(() => {
        if (signUpFn.error) {
            setErrorMsg(getErrorMessge(signUpFn.error))
        }
    }, [signUpFn.error, signUpFn.data])

    const handleSignup = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!formVals.email) {
            setErrorMsg("Please provide an email address.")
            return
        }

        if (!emailRegex.test(formVals.email)) {
            setErrorMsg("Please provide a valid email address.")
            return
        }

        if (!formVals.password) {
            setErrorMsg("Please provide a password.")
            return
        }

        if (!formVals.confirmPassword) {
            setErrorMsg("Please fill in the confirm password field.")
            return
        }

        if (formVals.password !== formVals.confirmPassword) {
            setErrorMsg("Password and confirm passwords does not match.")
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
                type={showPassword ? "text" : "password"}
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
                        fontSize: !showPassword ? "25px" : "",
                        fontWeight: "bold",
                    },
                    inputProps: {
                        style: {
                            color: "white",
                        },
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} style={{ color: "white" }}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                type={showPassword ? "text" : "password"}
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
                        fontSize: !showPassword ? "25px" : "",
                        fontWeight: "bold",
                    },
                    inputProps: {
                        style: {
                            color: "white",
                        },
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} style={{ color: "white" }}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <Box
                style={{
                    display: "flex",
                    flexDirection: shorterScreen ? "row" : "column",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: "1rem",
                }}
            >
                <Button
                    disabled={signUpFn.isLoading}
                    style={{
                        backgroundColor: COLOURS.darkishBrown,
                        color: "white",
                        borderRadius: "10px",
                        width: "33%",
                        padding: "1rem",
                        marginRight: shorterScreen ? "1rem" : "",
                    }}
                    variant="contained"
                    onClick={handleSignup}
                >
                    Signup
                </Button>
                {!shorterScreen && <Box style={{ height: ".1rem", width: "10rem", background: "white", marginTop: ".5rem", marginBottom: ".5rem" }} />}
                <Button
                    disabled={signUpFn.isLoading}
                    onClick={() => togglePage("login")}
                    style={{
                        backgroundColor: COLOURS.darkishBrown,
                        color: "white",
                        borderRadius: "10px",
                        width: shorterScreen ? "fit-content" : "43%",
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
