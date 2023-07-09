import { useMutation } from "@tanstack/react-query"
import { enqueueSnackbar } from "notistack"
import { BASE_API_URL } from "../constants"

interface SaveTestReq {
    wpm: number
    accuracy: number
    durationSecs: number
    correctWordsCount: number
    incorrectWordsCount: number
    totalCharsCount: number
    incorrectCharsCount: number
    correctCharsCount: number
}

export const useTestResults = () => {
    const saveTestResultFn = useMutation({
        mutationKey: ["save_test"],
        mutationFn: async ({
            wpm,
            accuracy,
            durationSecs,
            correctWordsCount,
            incorrectWordsCount,
            totalCharsCount,
            incorrectCharsCount,
            correctCharsCount,
        }: SaveTestReq) => {
            const res = await fetch(BASE_API_URL + "/test-result", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    wpm,
                    accuracy,
                    durationSecs,
                    correctWordsCount,
                    incorrectWordsCount,
                    totalCharsCount,
                    incorrectCharsCount,
                    correctCharsCount,
                }),
            })

            const data = await res.json()
            if (data.error) throw new Error(data.error)
            return data
        },
        onSuccess: (data) => {
            enqueueSnackbar("Test result saved.", {
                variant: "info",
                autoHideDuration: 3000,
            })
        },
        onError: (error: any) => {
            enqueueSnackbar("Failed to save test result, please contace support.", {
                variant: "error",
                autoHideDuration: 3000,
            })
            return error
        },
    })

    return { saveTestResultFn }
}
