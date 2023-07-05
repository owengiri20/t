import React from "react"
import { useGetDuration } from "../db"
import { COLOURS, useStyles } from "./CommonStyles"
import { FinishCard } from "./Finish"
import { Word, genWords } from "./utils/words"
import { useGame } from "../containers/game"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import "../shake.css"

// id of text display
const DISPLAY_ID = "textDisplay"

export const Game = () => {
    const classes = useStyles()
    const GAME = useGame()

    const [words, setWords] = React.useState(genWords())

    // console.log(words.length)

    const [scrollHeight, setScrollHeight] = React.useState(0)

    const [idx, setIdx] = React.useState(0)
    const [charIdx, setCharIdx] = React.useState(0)

    const [word, setWord] = React.useState<string>("")
    // const [finish, setFinish] = React.useState(false)
    // const [start, setStart] = React.useState(false)

    const duration = useGetDuration()
    const [seconds, setSeconds] = React.useState(duration)
    React.useEffect(() => {
        setSeconds(duration)
    }, [duration])

    const [correctWords, setCorrectWords] = React.useState(0)
    const [wrongWords, setWrongWords] = React.useState(0)

    const [correctChars, setCorrectChars] = React.useState(0)

    const [highlightedTextColour, setHighlightedTextColour] = React.useState<string>("#000")

    React.useEffect(() => {
        if (GAME.gameState.status !== "playing") return
        let countDown: NodeJS.Timeout | null = null
        if (seconds > 0) {
            countDown = setTimeout(() => setSeconds(seconds - 1), 1000)
        } else {
            GAME.setGameState((prev) => ({ ...prev, status: "finished" }))
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
        }

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
            {GAME.gameState.status !== "finished" ? (
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

                    {/* <div className={seconds <= 3 ? "shake-n-bake" : ""}> */}
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
                    {/* </div> */}

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
                <FinishCard correctWords={correctWords} incorrectWords={wrongWords} handleRestart={handleRestart} correctCharsCount={correctChars} />
            )}
        </Container>
    )
}
