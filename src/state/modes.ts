import React from "react"
import { createContainer } from "unstated-next"
import { genWords } from "../data/_data"

const useModes = () => {
	// modal
	const [modesModalOpen, setModesModalOpen] = React.useState(false)

	return {
		modesModalOpen,
		setModesModalOpen,
	}
}

export let ModesContainer = createContainer(useModes)
