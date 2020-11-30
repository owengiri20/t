import React from "react"
import { createContainer } from "unstated-next"
import { genWords } from "../data/_data"

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

export let ModesContainer = createContainer(useModes)
