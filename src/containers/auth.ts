import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import { atom, useAtom } from "jotai"
import { BASE_API_URL } from "../constants"
import { useHistory } from "react-router-dom"

const userAtom = atom<User | null>(null)

export interface User {
    name: string
    username: string
    email: string
}

export const useAuth = () => {
    // user state
    const [user, setUser] = useAtom(userAtom)
    const history = useHistory()

    // login func
    const loginFn = useMutation({
        mutationKey: ["login"],
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const res = await fetch(BASE_API_URL + "/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            const data = await res.json()
            if (data.error) throw new Error(data.error)
            return data
        },
        onSuccess: (data) => {
            setUser(data)
        },
        onError: (error) => {
            console.error("Error:", error)
        },
    })

    const logoutFn = useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            const res = await fetch(BASE_API_URL + "/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json()
            if (data.error) throw new Error(data.error)
            return data
        },
        onSuccess: (data) => {
            setUser(null)
            window.location.reload()
        },
        onError: (error) => {
            console.error("Error:", error)
        },
    })

    // Me func
    const meFn = useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await fetch(BASE_API_URL + "/auth/me", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json()
            if (data.error) throw new Error(data.error)
            return data
        },

        onSuccess: (data) => {
            setUser(data)
        },
        onError: (error) => {
            console.error("Error:", error)
        },
    })

    // signUp func
    const signUpFn = useMutation({
        mutationKey: ["logout"],
        mutationFn: async ({ email, password, confirmPassword }: { email: string; password: string; confirmPassword: string }) => {
            const res = await fetch(BASE_API_URL + "/signup", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    confirmPassword,
                }),
            })

            const data = await res.json()
            if (data.error) throw new Error(data.error)
            return data
        },
        onSuccess: (data) => {
            history.push("/auth?page=login")
        },
        onError: (error) => {
            console.error("Error:", error)
        },
    })

    return { user, loginFn, logoutFn, meFn, signUpFn }
}
