import Typography from "@mui/material/Typography"
import React from "react"

type Props = {
    classes: any
    GAME_STATE: any
    handleKeyPress: (key: any) => void
    handleBackSpace: (key: any) => void
    SET_GAME_STATE: (func: (prevState: any) => any) => void
    onCurrWord: (currIdx: number) => boolean
    getColour: (status: "correct" | "incorrect" | "eh") => string
}

export const Game: React.FC<Props> = ({ classes, GAME_STATE, handleKeyPress, handleBackSpace, SET_GAME_STATE, onCurrWord, getColour }) => {
    const DISPLAY_ID = "textDisplay"
    return (
        <>
            <div className={classes.timer}>
                <Typography
                    sx={{
                        color: GAME_STATE.timeLeft <= 3 ? "orange" : "lightBrown",
                        fontSize: "4.3rem",
                    }}
                >
                    {GAME_STATE.timeLeft}
                </Typography>
            </div>

            <div className={classes.typingArea} id={DISPLAY_ID}>
                <Typography variant="subtitle1">
                    {GAME_STATE.words.map((w: any, i: number) => (
                        <React.Fragment key={i}>
                            <span
                                style={{
                                    lineHeight: "62px",
                                    padding: "5px",
                                    backgroundColor: onCurrWord(i) ? GAME_STATE.highligtedTextColour : "",
                                    color: getColour(w.status),
                                    fontSize: "2.9cqh",
                                    fontWeight: onCurrWord(i) ? "bold" : "unset",
                                }}
                            >
                                {w.word.split("").map((l: string, idx: number) => {
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
                value={GAME_STATE.currentWord}
                onChange={(e) => {
                    SET_GAME_STATE((prevState: any) => ({ ...prevState, currentWord: e.target.value.trim() }))
                }}
                placeholder={GAME_STATE.currentWordIndex === 0 ? "Start Typing!" : ""}
            />
        </>
    )
}
