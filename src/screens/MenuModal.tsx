import { Box, Button, Modal, Typography } from "@material-ui/core"
import React from "react"
import { COLOURS } from "../game/style"

interface MenuModalProps {
    isOpen: boolean
    setIsOpen: (b: boolean) => void
}

export const MenuModal = (props: MenuModalProps) => {
    const { isOpen, setIsOpen } = props
    return (
        <Modal
            style={{ marginTop: "-5rem", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <Box
                style={{
                    padding: "2rem",
                    color: "white",
                    borderRadius: "20px",
                    background: COLOURS.darkishBrown,
                    height: "400px",
                    width: "400px",
                    position: "relative",
                }}
            >
                <Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: "1rem" }}>
                        Options Menu
                    </Typography>
                    <Typography id="modal-modal-description">Duration</Typography>
                </Box>
                <Box
                    style={{
                        position: "absolute",
                        bottom: "1rem",
                        width: "80%",
                    }}
                >
                    <Button
                        style={{
                            backgroundColor: COLOURS.darkishBrown,
                            color: COLOURS.lightBrown,
                            borderRadius: "10px",
                            width: "50%",
                        }}
                        variant="contained"
                        onClick={() => setIsOpen(false)}
                    >
                        Save
                    </Button>
                    <Button
                        style={{
                            backgroundColor: COLOURS.darkishBrown,
                            color: COLOURS.lightBrown,
                            borderRadius: "10px",
                            width: "50%",
                        }}
                        variant="contained"
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
