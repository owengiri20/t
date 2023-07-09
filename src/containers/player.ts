import { useQuery } from "@tanstack/react-query"
import { enqueueSnackbar } from "notistack"
import { BASE_API_URL } from "../constants"
import { User } from "./auth"

export interface PlayerStatsGetResp {
    player?: User
    tests_completed?: number
    hi_score_15?: number
    hi_score_30?: number
    hi_score_60?: number
    hi_score_120?: number
    avg_15?: number
    avg_30?: number
    avg_60?: number
    avg_120?: number
}

export interface TestResult {
    ID: number
    CreatedAt: string
    user_id: number
    wpm: number
    accuracy: number
    duration_secs: number
    correct_words_count: number
    incorrect_words_count?: number
    total_chars_count: number
    correct_chars_count: number
    incorrect_chars_count: number
}

export interface Avatar {
    // auto gorm fields
    ID: number
    CreatedAt: string
    DeletedAt: string

    url: string
    file_name: string
}

const playerStatsFetch = async (playerID: string) => {
    const res = await fetch(BASE_API_URL + `/player/${playerID}/stats`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })

    const data = await res.json()
    if (data.error) throw new Error(data.error)
    return data
}

export const usePlayer = (pID: string) => {
    // Public Player stats
    const playerStatsQuery = useQuery<PlayerStatsGetResp>({
        queryKey: ["player-stats-public", pID],
        queryFn: () => playerStatsFetch(pID),
        onError: (error: any) => {
            enqueueSnackbar("Failed to fetch player stats.", {
                variant: "error",
                autoHideDuration: 3000,
            })
            return error
        },
    })

    return { playerStatsQuery }
}
