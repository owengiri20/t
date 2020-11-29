import { Modal } from "@material-ui/core"
import React from "react"

interface NotImplementedModalProps {
	isOpen: boolean
	setIsOpen: (b: boolean) => void
}
export const NotImplementedModal = (props: NotImplementedModalProps) => {
	const { isOpen, setIsOpen } = props
	return (
		<Modal open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
			<div>test</div>
		</Modal>
	)
}
