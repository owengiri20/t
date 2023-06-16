import { Box, Button, Container, makeStyles, Paper, Typography } from "@material-ui/core"
import React from "react"

// icons
import StarRoundedIcon from "@material-ui/icons/StarRounded"
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded"

// images
import meh from "../icons/svg/032-neutral.svg"
import avarage from "../icons/svg/026-smile.svg"
import good from "../icons/svg/002-grin.svg"
import pro from "../icons/svg/014-sunglasses.svg"
import ninja from "../icons/png/ninja.png"
import { COLOURS } from "./CommonStyles"
import { useGetDuration } from "../db"

interface Result {
    rating: RatingType
    stars: number
    graphic: string
}
type RatingType = "meh" | "average" | "good" | "pro" | "ninja" | "too damn good"
export const getResult = (wpm: number): Result => {
    let stars = 0
    let rating: RatingType = "meh"
    let graphic = meh

    if (wpm < 30) {
        rating = "meh"
        stars = 1
        graphic = meh
    }
    if (wpm >= 30 && wpm < 50) {
        rating = "average"
        stars = 3
        graphic = avarage
    }
    if (wpm >= 50 && wpm < 70) {
        rating = "good"
        stars = 4
        graphic = good
    }
    if (wpm >= 70 && wpm < 90) {
        rating = "pro"
        stars = 5
        graphic = pro
    }

    if (wpm >= 90 && wpm < 110) {
        rating = "ninja"
        stars = 5
        graphic = ninja
    }

    if (wpm >= 110 && wpm < 130) {
        rating = "too damn good"
        stars = 5
        graphic = ninja
    }

    return {
        stars,
        rating,
        graphic,
    }
}

interface FinishCardProps {
    correctWords: number
    incorrectWords: number
    correctCharsCount: number
    handleRestart: () => void
}

export const finishStyles = makeStyles({
    finishCard: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    box: {
        width: "50%",
        background: "#21190f",
        borderRadius: "20px",
        margin: ".5rem",
    },
    wpm: {
        width: "50%",
        background: "#21190f",
        borderRadius: "20px",
        margin: ".5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    wpmText: {
        fontSize: "50px",
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },

    correctIncorrectText: {
        fontSize: "30px",
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    correctIncorrectTextBox: {
        width: "50%",
        background: "#21190f",
        borderRadius: "20px",
        margin: ".5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
    },
    bottom: {
        display: "flex",
        justifyContent: "center",
    },

    statusText: {
        display: "block",
        marginLeft: "5px",
    },
    statusCard: {
        display: "flex",
    },
    StarRatingBox: {
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    card: {
        display: "flex",
        margin: "10px",
        padding: "10px",
        transition: ".2s ease",
    },
    displayImage: {
        height: "80px",
        marginBottom: "1rem",
    },
})

const calculateWPM = (correctCharacters: number, timeInSeconds: number): number => {
    const totalWords = correctCharacters / 5 // Convert characters to words
    const timeInMinutes = timeInSeconds / 60 // Convert time to minutes
    const wpm = totalWords / timeInMinutes // Calculate words per minute

    return Math.round(wpm)
}

export const FinishCard = (props: FinishCardProps) => {
    const { correctWords, incorrectWords, handleRestart, correctCharsCount } = props
    const classes = finishStyles()
    return (
        <div className={classes.finishCard}>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Container className={classes.box}>
                    <StarRating result={getResult(calculateWPM(correctCharsCount, useGetDuration()))} />
                </Container>
                <Container className={classes.wpm}>
                    <Box className={classes.wpmText}>WPM</Box>
                    <Box className={classes.wpmText}>{calculateWPM(correctCharsCount, useGetDuration())}</Box>
                </Container>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Container className={classes.correctIncorrectTextBox} style={{ borderLeft: "15px solid green" }}>
                    <Box className={classes.correctIncorrectText}>Correct</Box>
                    <Box className={classes.correctIncorrectText}>{correctWords}</Box>
                </Container>
                <Container className={classes.correctIncorrectTextBox} style={{ borderLeft: "15px solid red" }}>
                    <Box className={classes.correctIncorrectText}>Incorrect</Box>
                    <Box className={classes.correctIncorrectText}>{incorrectWords}</Box>
                </Container>
            </Box>

            <Box style={{ marginBottom: "2rem", display: "flex", flexGrow: 1, justifyContent: "center", height: "8rem", width: "100%", marginTop: "2rem" }}>
                <Button
                    style={{ backgroundColor: COLOURS.darkishBrown, color: COLOURS.lightBrown, borderRadius: "10px", width: "30%" }}
                    variant="contained"
                    onClick={handleRestart}
                >
                    Play Again
                </Button>
            </Box>
        </div>
    )
}

interface StarRatingProps {
    result: Result
}
export const StarRating = (props: StarRatingProps) => {
    const { result } = props
    const classes = finishStyles()

    return (
        <div className={classes.StarRatingBox}>
            <img src={result.graphic} alt="" className={classes.displayImage} />
            <div />
            <Box>
                {Array.from(Array(5).keys()).map((s, i) => {
                    if (i < result.stars) {
                        return <StarRoundedIcon style={{ color: COLOURS.lightBrown, fontSize: "50px" }} key={i} />
                    }
                    return <StarBorderRoundedIcon style={{ color: COLOURS.lightBrown, fontSize: "50px" }} key={i} />
                })}
            </Box>
        </div>
    )
}
