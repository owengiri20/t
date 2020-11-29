import { Container, makeStyles, Modal, Paper } from "@material-ui/core"
import React from "react"
import SimpleTabs, { TabPanel } from "./tabs"

interface ModesModalProps {
	isOpen: boolean
	setIsOpen: (b: boolean) => void
}

const useStyles = makeStyles({
	modalContainer: {
		// height: "100%",
		display: "flex",
	},
	modalBody: {
		background: "white",
		height: "50%",
		margin: "auto",
		width: "90%",
		display: "flex",
		border: "1px solid black",
	},
	modalBodyInner: {
		width: "100%",
		// height: "90%",
		display: "flex",
		margin: "15px",
	},
	modeCard: {
		height: "30%",
		width: "30%",
		margin: "10px",
	},
})

export const ModesModal = (props: ModesModalProps) => {
	const classes = useStyles()
	const { isOpen, setIsOpen } = props
	return (
		<Modal
			className={classes.modalContainer}
			open={isOpen}
			onClose={() => setIsOpen(false)}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<Container className={classes.modalBody}>
				<SimpleTabs />
			</Container>
		</Modal>
	)
}
