import { Container, makeStyles, Modal } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles({
	modalContainer: {
		height: "100%",
		display: "flex",
		// justifyContent: "center",
	},
	modalBody: {
		background: "white",
		height: "50%",
		margin: "auto",
		width: "70%",
	},
})

interface NotImplementedModalProps {
	isOpen: boolean
	setIsOpen: (b: boolean) => void
}
export const NotImplementedModal = (props: NotImplementedModalProps) => {
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
			<Container className={classes.modalBody}>Not Implemented</Container>
		</Modal>
	)
}
