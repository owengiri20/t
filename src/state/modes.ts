import React from "react"
import { createContainer } from "unstated-next"

const useModes = () => {
	// modal
	const [modesModalOpen, setModesModalOpen] = React.useState(false)
	const [mode, setMode] = React.useState("") // refactor to be a obj

	return {
		modesModalOpen,
		setModesModalOpen,
		mode,
		setMode,
	}
}

export const ModesContainer = createContainer(useModes)
