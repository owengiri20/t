import { Button, Container, Typography } from "@material-ui/core"
import React from "react"
import { FinishCard } from "./finish"
import { useStyles } from "./style"
import { genWords, Word } from "./utils/words"

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

export const GameInner = (props: GameInnerProps) => {
    const classes = useStyles()

    const [count, setCount] = React.useState(0)

    const [idx, setIdx] = React.useState(0)
    const [charIdx, setCharIdx] = React.useState(0)

    const [word, setWord] = React.useState<string>("")
    const [finish, setFinish] = React.useState(false)
    const [start, setStart] = React.useState(false)
    const [seconds, setSeconds] = React.useState(15)

    const [correctWords, setCorrectWords] = React.useState(0)
    const [wrongWords, setWrongWords] = React.useState(0)

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

    const checkSubWord = () => {
        const currWord = props.words[idx]
        const subWord = currWord.word.substring(0, charIdx)
        const subWord2 = word.substring(0, charIdx + 1)

        if (word === "") {
            setC("#d7d9ff")
            return
        }
        if (subWord === subWord2) {
            setC("#9be6ab")
            return
        } else {
            setC("#f26262")
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

            setCount(count + 1)
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
                    <Button onClick={handleRestart}>Reset</Button>
                    <Button onClick={handleRestart}>Settings</Button>
                </>
            ) : (
                <FinishCard wordCount={count} correctWords={correctWords} incorrectWords={wrongWords} handleRestart={handleRestart} />
            )}
        </Container>
    )
}

export const Game = () => {
    const [words, setWords] = React.useState(genWords())
    const [scrollHeight, setScrollHeight] = React.useState(0)

    return <GameInner scrollHeight={scrollHeight} setScrollHeight={setScrollHeight} words={words} setWords={setWords} />
}
