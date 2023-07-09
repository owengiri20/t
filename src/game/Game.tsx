import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import React, { useState } from "react"
import { useGame } from "../containers/game"
import { calculateCharAccuracy, calculateWPM, saveTest, useGetDuration } from "../db"
import { COLOURS, useStyles } from "./CommonStyles"
import { FinishCard } from "./Finish"
import { genWords } from "./utils/words"

import { useAuth } from "../containers/auth"
import { useTestResults } from "../containers/tests"
import "../shake.css"

// id of text display
const DISPLAY_ID = "textDisplay"

export const Game = () => {
    // styles
    const classes = useStyles()

    // game state
    const GAME = useGame()

    // auth
    const { user } = useAuth()

    const [words, setWords] = React.useState(genWords())

    const [idx, setIdx] = React.useState(0)
    const [charIdx, setCharIdx] = React.useState(0)

    const [scrollHeight, setScrollHeight] = React.useState(0)

    // value in the input - word being typed
    const [word, setWord] = React.useState<string>("")

    const duration = useGetDuration()
    const [seconds, setSeconds] = React.useState(duration)
    React.useEffect(() => {
        setSeconds(duration)
    }, [duration])

    const [correctWords, setCorrectWords] = React.useState(0)
    const [wrongWords, setWrongWords] = React.useState(0)

    const [correctChars, setCorrectChars] = React.useState(0)
    const [totalChars, setTotalChars] = React.useState(0)
    const [incorrectChars, setIncorrectChars] = React.useState(0)

    const [highlightedTextColour, setHighlightedTextColour] = React.useState<string>("#000")

    const [testSaved, setTestSaved] = useState(false)

    const dur = useGetDuration()
    const wpm = calculateWPM(correctChars, dur, correctWords)
    const accuracy = calculateCharAccuracy(correctChars, totalChars, correctWords)
    const { saveTestResultFn } = useTestResults()

    React.useEffect(() => {
        if (GAME.gameState.status !== "playing") return
        let countDown: NodeJS.Timeout | null = null
        if (seconds > 0) {
            countDown = setTimeout(() => setSeconds(seconds - 1), 1000)
        } else {
            if (testSaved) return
            // saves to localstorage (for non logged in users)
            const test = {
                duration: dur,
                correctWords: correctWords,
                incorrectWords: wrongWords,
                wpm,
                currentTime: new Date(),
            }

            saveTest(test)

            //  saves to db
            if (user) {
                saveTestResultFn.mutate({
                    correctWordsCount: correctWords,
                    durationSecs: dur,
                    incorrectWordsCount: wrongWords,
                    accuracy,
                    wpm,
                    correctCharsCount: correctChars,
                    incorrectCharsCount: incorrectChars,
                    totalCharsCount: totalChars,
                })
            }

            setTestSaved(true)
            GAME.setGameState((prev) => ({ ...prev, status: "finished" }))
            console.log({ correctChars, incorrectChars, totalChars })
        }

        //  Cleanup function
        return () => {
            if (countDown) {
                clearTimeout(countDown)
            }
        }
    }, [GAME.gameState.status, seconds])

    const handleStatus = (correct: boolean) => {
        const newWords = [...words]
        if (correct) {
            setCorrectWords((prev) => prev + 1)
            newWords[idx] = {
                ...newWords[idx],
                status: "correct",
            }
        } else {
            setWrongWords((prev) => prev + 1)
            newWords[idx] = {
                ...newWords[idx],
                status: "incorrect",
            }
        }
        setWords(newWords)
    }

    const handleRestart = () => {
        window.location.reload()
    }

    // This function is used to compare a typed string against a target word.
    const checkSubWord = () => {
        const currWord = words[idx]

        const subWord = currWord.word.substring(0, charIdx)

        const subWord2 = word.substring(0, charIdx + 1)

        if (word === "") {
            setHighlightedTextColour("#000")
            return
        }

        if (subWord === subWord2) {
            setHighlightedTextColour("#1d331f")
            return
        } else {
            setHighlightedTextColour("#470c0a")
        }
    }

    React.useEffect(() => {
        checkSubWord()
    }, [word])

    const handleKeyPress = (key: any) => {
        // if pressing space when empty, do nothing
        if (key.code === "Space" && word === "") {
            return
        }

        const currWord = words[idx]

        if (GAME.gameState.status !== "playing") {
            GAME.setGameState((prev) => ({ ...prev, status: "playing" }))
        }

        // Check if the typed character is correct and increment correctChars if it is
        if (key.key === currWord.word[charIdx]) {
            setCorrectChars(correctChars + 1)
        } else if (key.code !== "Space") {
            setIncorrectChars(incorrectChars + 1) // Incorrect character count
        }

        setTotalChars(totalChars + 1) // Total character count

        setCharIdx(charIdx + 1)

        if (key.code === "Space") {
            if (idx === words.length) {
                return
            }
            if (word === "") return
            setWord("")
            setIdx(idx + 1)
            setCharIdx(0)
            if (currWord.word === word) {
                handleStatus(true)
            } else {
                handleStatus(false)
            }

            return
        }
    }

    const handleBackSpace = (key: any) => {
        if (word.length === 0) return
        if (key.code && key.code === "Backspace") {
            if (charIdx === 0) return
            setCharIdx(charIdx - 1)
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
        return idx === currIdx
    }

    // useffect to handle scroll height of text display
    React.useEffect(() => {
        // if first word
        if (idx === 0) return

        // get prevous word
        const prevWord = words[idx - 1]

        // get textDisplay div
        let textDisplay = document.getElementById(DISPLAY_ID)

        // handle scroll
        if (textDisplay && prevWord.cut) {
            textDisplay.scrollTop = scrollHeight
            setScrollHeight(scrollHeight + 61)
        }
    }, [idx])

    return (
        <Container className={classes.CenterBox}>
            {GAME.gameState.status !== "idle" ? (
                <>
                    <div className={classes.timer}>
                        <Typography
                            sx={{
                                color: seconds <= 3 ? "orange" : COLOURS.lightBrown,
                                fontSize: "4.3rem",
                            }}
                        >
                            {seconds}
                        </Typography>
                    </div>

                    <div className={classes.typingArea} id={DISPLAY_ID}>
                        <Typography variant="subtitle1">
                            {words.map((w, i) => (
                                <React.Fragment key={i}>
                                    <span
                                        style={{
                                            padding: "5px",
                                            backgroundColor: onCurrWord(i) ? highlightedTextColour : "",
                                            color: getColour(w.status),
                                            fontSize: "35px",
                                            fontWeight: onCurrWord(i) ? "bold" : "unset",
                                        }}
                                        key={i}
                                    >
                                        {w.word.split("").map((l, idx) => {
                                            return (
                                                <span key={l + idx}>
                                                    <span>{l}</span>
                                                </span>
                                            )
                                        })}
                                    </span>
                                    {w.cut && <br />}
                                </React.Fragment>
                            ))}
                        </Typography>
                    </div>

                    <div className={classes.line}></div>
                    <textarea
                        className={classes.textAreaStyles}
                        autoFocus
                        onKeyPress={handleKeyPress}
                        onKeyDown={handleBackSpace}
                        value={word}
                        onChange={(e) => setWord(e.target.value.trim())}
                        placeholder={idx === 0 ? "Start Typing!" : ""}
                    />
                </>
            ) : (
                <FinishCard
                    totalCharsCount={totalChars}
                    correctWords={correctWords}
                    incorrectWords={wrongWords}
                    handleRestart={handleRestart}
                    correctCharsCount={correctChars}
                />
            )}
        </Container>
    )
}
