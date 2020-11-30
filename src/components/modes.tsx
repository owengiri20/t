import { Container, makeStyles, Modal, Paper } from "@material-ui/core"
import React from "react"
import { ModesContainer } from "../state/modes"
import { SimpleTabs, TabPanel } from "./tabs"

interface ModesModalProps {}

const useStyles = makeStyles({
	modalContainer: {
		// height: "100%",
		display: "flex",
		outline: "none !important",
		"&:focus": {
			outline: "none !important",
		},
	},
	modalBody: {
		background: "white",
		height: "50%",
		margin: "auto",
		width: "90%",
		display: "flex",
		// border: "1px solid black",
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
	const { modesModalOpen, setModesModalOpen } = ModesContainer.useContainer()
	return (
		<Modal
			style={{
				outline: "none",
			}}
			disableAutoFocus={true}
			className={classes.modalContainer}
			open={modesModalOpen}
			onClose={() => setModesModalOpen(false)}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<Container id="ddffffffffffffffffff" className={classes.modalBody}>
				<SimpleTabs />
			</Container>
		</Modal>
	)
}
