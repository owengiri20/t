import { Box, Button, TextField, makeStyles } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { COLOURS } from "../game/CommonStyles"
import { useMutation } from "@tanstack/react-query"
import { BASE_API_URL } from "../constants"

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

    // form vals, may change to react-hook-forms in the future
    const [formVals, setFormVals] = useState<FormVals>({
        email: "",
        password: "",
    })

    const { mutate } = useMutation({
        mutationKey: ["todos"],
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            try {
                console.log("calling")

                const res = await fetch(BASE_API_URL + "/login", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                })

                const data = await res.json()
                if (data.error) throw new Error(data.error)
                return data
            } catch (e) {
                console.error("Error:", e)
                throw e
            }
        },
    })

    const handleLogin = () => {
        if (!formVals.email) {
            console.log("email empty")
            return
        }

        if (!formVals.password) {
            console.log("password empty")
            return
        }

        mutate({ email: formVals.email, password: formVals.password })
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
