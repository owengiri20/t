import { Button, Container, Typography } from "@material-ui/core"
import React from "react"
import { FinishCard } from "./Finish"
import { useStyles } from "./CommonStyles"
import { genWords, Word } from "./utils/words"
import { getDuration } from "../db"

// disable scroll wheel
window.addEventListener(
    "wheel",
    function (e) {
        e.preventDefault()
    },
    { passive: false },
)

// id of text display
const DISPLAY_ID = "textDisplay"

interface GameInnerProps {
    words: Word[]
    setWords: (t: Word[]) => void
    scrollHeight: number
    setScrollHeight: (h: number) => void
}

const GameInner = (props: GameInnerProps) => {
    const classes = useStyles()

    const [idx, setIdx] = React.useState(0)
    const [charIdx, setCharIdx] = React.useState(0)

    const [word, setWord] = React.useState<string>("")
    const [finish, setFinish] = React.useState(false)
    const [start, setStart] = React.useState(false)
    const [seconds, setSeconds] = React.useState(getDuration())

    const [correctWords, setCorrectWords] = React.useState(0)
    const [wrongWords, setWrongWords] = React.useState(0)

    const [correctChars, setCorrectChars] = React.useState(0)

    const [c, setC] = React.useState<string>("black")

    React.useEffect(() => {
        if (!start) return
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000)
        } else {
            setFinish(true)
        }
    })

    // sets words status "incorrect" or "correct"
    const handleStatus = (correct: boolean) => {
        if (correct) {
            setCorrectWords(correctWords + 1)
            props.setWords(
                props.words.map((w, i) => {
                    if (i === idx) {
                        return {
                            ...w,
                            status: "correct",
                        }
                    }
                    return w
                }),
            )
        } else {
            setWrongWords(wrongWords + 1)
            props.setWords(
                props.words.map((w, i) => {
                    if (i === idx) {
                        return {
                            ...w,
                            status: "incorrect",
                        }
                    }
                    return w
                }),
            )
        }
    }

    const handleRestart = () => {
        window.location.reload()
    }
    // This function is used to compare a typed string against a target word.
    const checkSubWord = () => {
        // This line grabs the current target word from an array of words passed into the parent component.
        const currWord = props.words[idx]

        // This line creates a substring of the target word up to the current character index the user is supposed to type.
        const subWord = currWord.word.substring(0, charIdx)

        // This line creates a substring of what the user has actually typed so far, up to one character beyond the current character index.
        const subWord2 = word.substring(0, charIdx + 1)

        // If the user has not typed anything (i.e., if their input is an empty string)...
        if (word === "") {
            // Set a color value to a light blue color (likely used elsewhere to give visual feedback).
            setC("#000")
            // Stop executing the function here.
            return
        }

        // If the substring of the target word matches the substring of what the user has typed...
        if (subWord === subWord2) {
            // Set the color value to a light green (likely to indicate the user is typing correctly).
            setC("#1d331f")
            // Stop executing the function here.
            return
        }
        // If none of the above conditions were met (i.e., the user has typed something but it does not match the target word)...
        else {
            // Set the color value to light red (likely to indicate the user has made a typo).
            setC("#470c0a")
        }
    }

    React.useEffect(() => {
        checkSubWord()
    }, [word])

    const handleKeyPress = (key: any) => {
        if (key.code === "Space" && word === "") {
            return
        }

        const currWord = props.words[idx]

        if (!start) {
            setStart(true)
        }

        // Check if the typed character is correct and increment correctChars if it is
        if (key.key === currWord.word[charIdx]) {
            setCorrectChars(correctChars + 1)
        }

        setCharIdx(charIdx + 1)

        if (key.code === "Space") {
            if (idx === props.words.length) {
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

    const getColour = (status: "correct" | "incorrect" | "eh") => {
        if (status === "correct") return "green"
        if (status === "incorrect") return "red"
        if (status === "eh") return "#AA8270"
    }

    const onCurrWord = (currIdx: number) => {
        return idx === currIdx
    }

    // useffect to handle scroll height of text display
    React.useEffect(() => {
        // if first word
        if (idx === 0) return

        // get prevous word
        const prevWord = props.words[idx - 1]

        // get textDisplay div
        let textDisplay = document.getElementById(DISPLAY_ID)

        // handle scroll
        if (textDisplay && prevWord.cut) {
            textDisplay.scrollTop = props.scrollHeight
            props.setScrollHeight(props.scrollHeight + 61)
        }
    }, [idx])

    return (
        <Container className={classes.CenterBox}>
            {!finish ? (
                <>
                    <div className={classes.timer}>
                        <Typography className={classes.timerText} variant="h3">
                            {seconds}
                        </Typography>
                    </div>

                    <div className={classes.typingArea} id={DISPLAY_ID}>
                        <Typography variant="subtitle1">
                            {props.words.map((w, i) => (
                                <React.Fragment key={i}>
                                    <span
                                        style={{
                                            padding: "5px",
                                            backgroundColor: onCurrWord(i) ? c : "",
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
                <FinishCard correctWords={correctWords} incorrectWords={wrongWords} handleRestart={handleRestart} correctCharsCount={correctChars} />
            )}
        </Container>
    )
}

export const Game = () => {
    const [words, setWords] = React.useState(genWords())
    const [scrollHeight, setScrollHeight] = React.useState(0)

    return <GameInner scrollHeight={scrollHeight} setScrollHeight={setScrollHeight} words={words} setWords={setWords} />
}
