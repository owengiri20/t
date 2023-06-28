import { BASE_API_URL } from "./constants"

export async function fetchData(endpoint: string, method: string, body: any) {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    })

    return response
}

export const getErrorMessge = (err: any) => {
    return err?.message ?? "Something went wrong, please contact support"
}
