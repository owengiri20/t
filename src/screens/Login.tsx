import { Box, Button, IconButton, InputAdornment, TextField, makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { COLOURS } from "../game/CommonStyles"
import { useMutation } from "@tanstack/react-query"
import { BASE_API_URL } from "../constants"
import { Alert } from "@mui/material"
import { useAuth } from "../containers/auth"
import { log } from "console"
import { getErrorMessge } from "../utils"
import { enqueueSnackbar } from "notistack"
import { VisibilityOff, Visibility } from "@material-ui/icons"

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
}

export const Login = ({ togglePage }: { togglePage: (path: string) => void }) => {
    const classes = useStyles()
    const { loginFn } = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    // form vals, may change to react-hook-forms in the future
    const [formVals, setFormVals] = useState<FormVals>({
        email: "",
        password: "",
    })

    // error state
    const [errorMsg, setErrorMsg] = useState("")
    useEffect(() => {
        if (loginFn.error) {
            setErrorMsg(getErrorMessge(loginFn.error))
        }
    }, [loginFn.error, loginFn.data])

    const handleLogin = () => {
        if (!formVals.email) {
            setErrorMsg("Please enter your email.")
            return
        }

        if (!formVals.password) {
            setErrorMsg("Please enter your password")
            return
        }

        loginFn.mutate({ email: formVals.email, password: formVals.password })
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

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

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
                    onClick={handleLogin}
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
