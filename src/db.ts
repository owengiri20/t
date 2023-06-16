// import { useLocalStorage, useReadLocalStorage } from "usehooks-ts"

import { useReadLocalStorage } from "usehooks-ts"

const isWholeNumber = (s: string): boolean => {
    const n = Number(s)
    return !Number.isNaN(n) && Number.isInteger(n) && n >= 0
}

// settings
export interface Settings {
    duration: number
}

export const getSettings = (): Settings => {
    let settings: Settings = {
        duration: 15,
    }

    // get settings from localstorage
    settings.duration = getDuration()
    return settings
}

export const handleSaveSettings = (duration: number) => {
    // set duration
    setDuration(duration)
}

// duration funcs
const getDuration = () => {
    let duration = 15
    const durationFromLocalStorage = localStorage.getItem("duration") || 0
    if (!durationFromLocalStorage || !isWholeNumber(durationFromLocalStorage)) {
        localStorage.setItem("duration", "15")
    } else {
        duration = parseInt(durationFromLocalStorage)
    }
    return duration
}

export const setDuration = (duration: number) => {
    // Check if it's a whole number (integer and non-negative)
    if (Number.isInteger(duration) && duration >= 0) {
        localStorage.setItem("duration", duration.toString())
        window.dispatchEvent(new Event("storage"))
    } else {
        console.error("Invalid input: Duration must be a whole number.")
    }
}

export const useGetDuration = () => {
    let duration = 15

    const durationFromLocalStorage = useReadLocalStorage("duration") as number
    if (!durationFromLocalStorage) {
        localStorage.setItem("duration", "15")
    } else {
        duration = durationFromLocalStorage
    }

    return duration
}
