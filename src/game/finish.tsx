import { Button, Container, makeStyles, Paper, Typography } from "@material-ui/core"
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
import { Character } from "./typer"
// import tooGood from "../icons/svg/032-neutral.svg"

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

	if (wpm >= 110) {
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

const cap = (s: string) => {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

interface FinishCardProps {
	correctWords: number
	incorrectWords: number
	handleRestart: () => void
	wordCount: number
	chars: Character[]
}

export const finishStyles = makeStyles({
	top: {
		width: "50%",
	},
	bottom: {
		display: "flex",
		justifyContent: "center",
	},
	finishCard: {
		maxWidth: "1000px",
		margin: "auto",
	},
	statusText: {
		display: "block",
		marginLeft: "5px",
	},
	statusCard: {
		display: "flex",
	},
	StarRatingBox: {
		padding: "15px",
		textAlign: "center",
	},
	card: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: "10px",
		padding: "10px",
		transition: ".2s ease",
	},
	displayImage: {
		height: "80px",
	},
})

export const FinishCard = (props: FinishCardProps) => {
	const { correctWords, incorrectWords, handleRestart, wordCount, chars } = props
	const classes = finishStyles()

	const calcWPM = () => {
		const correctCharsTotal = chars.filter((c) => c === "correct").length
		const incorrectCharsTotal = chars.filter((c) => c === "incorrect").length

		const fuck = (correctCharsTotal - incorrectCharsTotal) / 5

		return fuck
	}

	const calcAccuraccy = () => {
		const output = (correctWords / wordCount) * 100
		if (isNaN(output)) {
			return 0
		}
		return output.toFixed(2)
	}

	return (
		<div className={classes.finishCard}>
			<Container className={classes.top}>
				<Paper>{<StarRating result={getResult(calcWPM())} />}</Paper>
			</Container>
			<Container className={classes.bottom}>
				<Paper className={classes.card}>
					<Typography variant="h6">Acurracy: {calcAccuraccy()}%</Typography>
				</Paper>

				<Paper className={classes.card}>
					<Typography variant="h6">WPM: {calcWPM().toFixed(2)}</Typography>
				</Paper>
				<Paper className={`${classes.card} ${classes.card}`}>
					<Typography className={classes.statusText} variant="h6">
						Correct words: {correctWords}
					</Typography>
					<Typography className={classes.statusText} variant="h6">
						|
					</Typography>
					<Typography className={classes.statusText} variant="h6">
						Incorrect words: {incorrectWords}
					</Typography>
				</Paper>
			</Container>
			<hr />

			<Button variant="contained" color="primary" onClick={handleRestart}>
				Restart
			</Button>
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
			<Typography variant={"h5"}>{cap(result.rating)}</Typography>
			{Array.from(Array(5).keys()).map((s, i) => {
				if (i < result.stars) {
					return <StarRoundedIcon style={{ color: "#ffba08", fontSize: "50px" }} key={i} />
				}
				return <StarBorderRoundedIcon style={{ color: "#ffba08", fontSize: "50px" }} key={i} />
			})}
		</div>
	)
}
