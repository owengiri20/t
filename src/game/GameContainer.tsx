import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import React from "react"
import { useGame } from "../containers/game"
import { COLOURS, useStyles } from "./CommonStyles"
import { Finish } from "./Finish"
import { useAuth } from "../containers/auth"
import { useTestResults } from "../containers/tests"
import { calculateCharAccuracy, calculateWPM } from "../calculations"
import { Game } from "./Game"

// id of text display
const DISPLAY_ID = "textDisplay"

export const GameContainer = () => {
    // styles
    const classes = useStyles()

    // game state
    const GAME = useGame()
    const { GAME_STATE, SET_GAME_STATE, resetState } = GAME

    // auth
    const { user } = useAuth()

    React.useEffect(() => {
        SET_GAME_STATE((prevState) => ({ ...prevState, timeLeft: GAME_STATE.durationSeconds }))
    }, [GAME_STATE.durationSeconds])

    const { saveTestResultFn } = useTestResults()
    const wpm = calculateWPM(GAME_STATE.correctCharacters, GAME_STATE.durationSeconds, GAME_STATE.correctWordsCount)
    const accuracy = calculateCharAccuracy(GAME_STATE.correctCharacters, GAME_STATE.totalCharacters, GAME_STATE.correctWordsCount)

    React.useEffect(() => {
        if (GAME_STATE.status !== "playing") return
        let countDown: NodeJS.Timeout | null = null
        if (GAME_STATE.timeLeft > 0) {
            countDown = setTimeout(() => SET_GAME_STATE((prevState) => ({ ...prevState, timeLeft: GAME_STATE.timeLeft - 1 })), 1000)
        } else {
            if (GAME_STATE.testSaved) return

            //  saves to db
            if (user) {
                saveTestResultFn.mutate({
                    correctWordsCount: GAME_STATE.correctWordsCount,
                    incorrectWordsCount: GAME_STATE.incorrectWordsCount,
                    durationSecs: GAME_STATE.durationSeconds,
                    accuracy,
                    wpm,
                    correctCharsCount: GAME_STATE.correctCharacters,
                    incorrectCharsCount: GAME_STATE.incorrectCharacters,
                    totalCharsCount: GAME_STATE.totalCharacters,
                })
            }

            SET_GAME_STATE((prevState) => ({ ...prevState, testSaved: true }))
            SET_GAME_STATE((prev) => ({ ...prev, status: "finished" }))
        }

        //  Cleanup function
        return () => {
            if (countDown) {
                clearTimeout(countDown)
            }
        }
    }, [GAME_STATE.status, GAME_STATE.timeLeft])

    const handleStatus = (correct: boolean) => {
        const newWords = [...GAME_STATE.words]
        if (correct) {
            SET_GAME_STATE((prevState) => ({ ...prevState, correctWordsCount: prevState.correctWordsCount + 1 }))

            // setCorrectWords((prev) => prev + 1)
            newWords[GAME_STATE.currentWordIndex] = {
                ...newWords[GAME_STATE.currentWordIndex],
                status: "correct",
            }
        } else {
            SET_GAME_STATE((prevState) => ({ ...prevState, incorrectWordsCount: prevState.incorrectWordsCount + 1 }))

            newWords[GAME_STATE.currentWordIndex] = {
                ...newWords[GAME_STATE.currentWordIndex],
                status: "incorrect",
            }
        }
        SET_GAME_STATE((prevState) => ({ ...prevState, words: newWords }))
    }

    // This function is used to compare a typed string against a target word.
    const checkSubWord = () => {
        const currWord = GAME_STATE.words[GAME_STATE.currentWordIndex]
        const subWord = currWord.word.substring(0, GAME_STATE.currentCharIndex)
        const subWord2 = GAME_STATE.currentWord.substring(0, GAME_STATE.currentCharIndex + 1)
        if (GAME_STATE.currentWord === "") {
            SET_GAME_STATE((prevState) => ({ ...prevState, highligtedTextColour: "#000" }))
            return
        }

        if (subWord === subWord2) {
            SET_GAME_STATE((prevState) => ({ ...prevState, highligtedTextColour: "#1d331f" }))
            return
        } else {
            SET_GAME_STATE((prevState) => ({ ...prevState, highligtedTextColour: "#470c0a" }))
        }
    }

    React.useEffect(() => {
        checkSubWord()
    }, [GAME_STATE.currentWord])

    const handleKeyPress = (key: any) => {
        // if pressing space when empty, do nothing
        if (key.code === "Space" && GAME_STATE.currentWord === "") {
            return
        }

        const currWord = GAME_STATE.words[GAME_STATE.currentWordIndex]

        if (GAME_STATE.status !== "playing") {
            SET_GAME_STATE((prev) => ({ ...prev, status: "playing" }))
        }

        // Check if the typed character is correct and increment correctChars if it is
        if (key.key === currWord.word[GAME_STATE.currentCharIndex]) {
            SET_GAME_STATE((prevState) => ({ ...prevState, correctCharacters: prevState.correctCharacters + 1 }))
        } else if (key.code !== "Space") {
            SET_GAME_STATE((prevState) => ({ ...prevState, incorrectCharacters: prevState.incorrectCharacters + 1 }))
        }

        SET_GAME_STATE((prevState) => ({ ...prevState, totalCharacters: prevState.totalCharacters + 1 }))
        SET_GAME_STATE((prevState) => ({ ...prevState, currentCharIndex: prevState.currentCharIndex + 1 }))

        if (key.code === "Space") {
            if (GAME_STATE.currentWordIndex === GAME_STATE.words.length) {
                return
            }
            if (GAME_STATE.currentWord === "") return
            SET_GAME_STATE((prevState) => ({ ...prevState, currentWord: "" }))
            SET_GAME_STATE((prevState) => ({ ...prevState, currentWordIndex: prevState.currentWordIndex + 1 }))
            SET_GAME_STATE((prevState) => ({ ...prevState, currentCharIndex: 0 }))
            if (currWord.word === GAME_STATE.currentWord) {
                handleStatus(true)
            } else {
                handleStatus(false)
            }

            return
        }
    }

    const handleBackSpace = (key: any) => {
        if (GAME_STATE.currentWord.length === 0) return
        if (key.code && key.code === "Backspace") {
            if (GAME_STATE.currentCharIndex === 0) return
            SET_GAME_STATE((prevState) => ({ ...prevState, currentCharIndex: prevState.currentCharIndex - 1 }))
        }
    }

    const statusToColorMap: Record<"correct" | "incorrect" | "eh", string> = {
        correct: "green",
        incorrect: "red",
        eh: "#AA8270",
    }

    const getColour = (status: "correct" | "incorrect" | "eh") => {
        return statusToColorMap[status]
    }

    const onCurrWord = (currIdx: number) => {
        return GAME_STATE.currentWordIndex === currIdx
    }

    // useffect to handle scroll height of text display
    React.useEffect(() => {
        // if first word
        if (GAME_STATE.currentWordIndex === 0) return

        // get prevous word
        const prevWord = GAME_STATE.words[GAME_STATE.currentWordIndex - 1]

        // get textDisplay div
        let textDisplay = document.getElementById(DISPLAY_ID)

        // handle scroll
        if (textDisplay && prevWord.cut) {
            textDisplay.scrollTop = GAME_STATE.scrollHeight
            SET_GAME_STATE((prevState) => ({ ...prevState, scrollHeight: prevState.scrollHeight + 61 }))
        }
    }, [GAME_STATE.currentWordIndex])

    return (
        <Container className={classes.CenterBox}>
            {GAME_STATE.status !== "finished" ? (
                <Game
                    classes={classes}
                    GAME_STATE={GAME_STATE}
                    handleKeyPress={handleKeyPress}
                    handleBackSpace={handleBackSpace}
                    SET_GAME_STATE={SET_GAME_STATE}
                    onCurrWord={onCurrWord}
                    getColour={getColour}
                />
            ) : (
                <Finish
                    totalCharsCount={GAME_STATE.totalCharacters}
                    correctWords={GAME_STATE.correctWordsCount}
                    incorrectWords={GAME_STATE.incorrectWordsCount}
                    correctCharsCount={GAME_STATE.correctCharacters}
                    handleRestart={resetState}
                />
            )}
        </Container>
    )
}
