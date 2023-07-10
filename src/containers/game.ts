import { atom, useAtom } from "jotai"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Word, genWords } from "../game/utils/words"
import { useGetDuration } from "../db"

export interface GameState {
    timeLeft: number

    status: "finished" | "idle" | "playing"
    words: Word[]
    currentWord: string // word being typed, the word in that start typing box
    currentWordIndex: number // current index of the word being typed, ie first word = 0
    currentCharIndex: number // current character of the current word being typed

    correctWordsCount: number
    incorrectWordsCount: number

    correctCharacters: number
    incorrectCharacters: number
    totalCharacters: number

    highligtedTextColour: string
    scrollHeight: number
    durationSeconds: number
    testSaved: boolean
}

const gameStateAtom = atom<GameState>({
    timeLeft: 0,
    status: "idle",
    words: genWords(),
    currentWordIndex: 0,
    currentCharIndex: 0,
    currentWord: "",

    correctWordsCount: 0,
    incorrectWordsCount: 0,

    correctCharacters: 0,
    incorrectCharacters: 0,
    totalCharacters: 0,

    highligtedTextColour: "#000",
    scrollHeight: 0,

    durationSeconds: 0,
    testSaved: false,
})

export const useGame = () => {
    const [GAME_STATE, SET_GAME_STATE] = useAtom(gameStateAtom)

    const hideSettings = GAME_STATE.status !== "idle"

    const durationFromLs = useGetDuration()

    const location = useLocation()
    useEffect(() => {
        SET_GAME_STATE((prevState) => ({ ...prevState, status: "idle" }))
    }, [location, SET_GAME_STATE])

    useEffect(() => {
        resetState()
    }, [])

    const resetState = () => {
        SET_GAME_STATE({
            timeLeft: durationFromLs,
            durationSeconds: durationFromLs,
            status: "idle",
            words: genWords(),
            currentWordIndex: 0,
            currentCharIndex: 0,
            currentWord: "",

            correctWordsCount: 0,
            incorrectWordsCount: 0,

            correctCharacters: 0,
            incorrectCharacters: 0,
            totalCharacters: 0,

            highligtedTextColour: "#000",
            scrollHeight: 0,
            testSaved: false,
        })
    }

    return {
        GAME_STATE,
        SET_GAME_STATE,
        hideSettings,
        resetState,
    }
}
