import { Button, Typography } from "@material-ui/core"
import React from "react"
import { useStyles } from "./style"

// icons
import StarRoundedIcon from "@material-ui/icons/StarRounded"
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded"

interface Result {
	rating: RatingType
	stars: number
	graphic: string
}
type RatingType = "meh" | "average" | "good" | "pro" | "ninja" | "too damn good"
export const getResult = (wpm: number): Result => {
	let stars = 0
	let rating: RatingType = "meh"
	if (wpm < 30) {
		rating = "meh"
		stars = 1
	}
	if (wpm >= 30 && wpm < 50) {
		rating = "average"
		stars = 3
	}
	if (wpm >= 50 && wpm < 70) {
		rating = "good"
		stars = 4
	}
	if (wpm >= 70 && wpm < 90) {
		rating = "pro"
		stars = 5
	}

	if (wpm >= 90 && wpm < 110) {
		rating = "ninja"
		stars = 5
	}

	if (wpm >= 110 && wpm < 130) {
		rating = "too damn good"
		stars = 5
	}

	return {
		stars,
		rating,
		graphic: "",
	}
}

interface FinishCardProps {
	correctWords: number
	incorrectWords: number
	handleRestart: () => void
}

export const FinishCard = (props: FinishCardProps) => {
	const { correctWords, incorrectWords, handleRestart } = props
	const classes = useStyles()

	const calcWPM = () => (correctWords / 60) * 60

	return (
		<div className={classes.finishCard}>
			{<StarRating result={getResult(calcWPM())} />}
			<Typography variant="h4">WPM: {calcWPM()}</Typography>
			<Typography variant="h4">Acurracy: {calcWPM()}</Typography>

			<Typography variant="h4">Correct words: {correctWords}</Typography>
			<Typography variant="h4">Incorrect words: {incorrectWords}</Typography>

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
	const classes = useStyles()

	return (
		<div className={classes.StarRatingBox}>
			<Typography variant={"h5"}>{result.rating}</Typography>
			{Array.from(Array(5).keys()).map((s, i) => {
				if (i < result.stars) {
					return <StarRoundedIcon style={{ color: "#ffba08", fontSize: "50px" }} key={i} />
				}
				return <StarBorderRoundedIcon style={{ color: "#ffba08", fontSize: "50px" }} key={i} />
			})}
		</div>
	)
}
