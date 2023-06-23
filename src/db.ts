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

interface Test {
    duration: number
    correctWords: number
    incorrectWords: number
    wpm: number
    currentTime: Date
}

// Tests
export const saveTest = (test: Test) => {
    // check if "tests exist in localstorage"
    if (!localStorage.getItem("tests")) {
        // insert a new test key in localstorage with new test
        localStorage.setItem("tests", JSON.stringify([test]))
        return
    }

    const currentTests = JSON.parse(localStorage.getItem("tests") || "")
    const updatedTests = [...currentTests, test]
    localStorage.setItem("tests", JSON.stringify(updatedTests))
}

export const getTests = () => {
    const currentTests = JSON.parse(localStorage.getItem("tests") || "[]")
    return (currentTests as Test[]).sort((a, b) => new Date(b.currentTime).getTime() - new Date(a.currentTime).getTime()).slice(0, 3)
}

export const calculateWPM = (correctCharacters: number, timeInSeconds: number, correctWordsCount: number): number => {
    const totalWords = (correctCharacters + correctWordsCount) / 5 // Convert characters to words
    const timeInMinutes = timeInSeconds / 60 // Convert time to minutes
    const wpm = totalWords / timeInMinutes // Calculate words per minute

    return wpm
}
