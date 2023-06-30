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

export function formatDate(dateStr: string): string {
    let dateObj = new Date(dateStr)
    let formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
    return formattedDate
}

export function formatToDateTimeString(dateString: string): string {
    const date = new Date(dateString)

    // Pad the month and date with a leading zero if they are less than 10
    const day = String(date.getUTCDate()).padStart(2, "0")
    const month = String(date.getUTCMonth() + 1).padStart(2, "0") // January is 0!
    const year = date.getUTCFullYear()

    let hours = date.getUTCHours()
    const minutes = String(date.getUTCMinutes()).padStart(2, "0")

    // Convert 24-hour format to 12-hour format and set the AM/PM indicator
    const amPm = hours >= 12 ? "pm" : "am"
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const hoursStr = String(hours).padStart(2, "0")

    return `${day}/${month}/${year} - ${hoursStr}:${minutes} ${amPm}`
}

export function getErrorMessge(err: any) {
    return err?.message ?? "Something went wrong, please contact support"
}
