import { Box, Button, Modal } from "@material-ui/core"
import React, { useState } from "react"
import { handleSaveSettings, useGetDuration } from "../db"
import { COLOURS } from "../game/CommonStyles"

interface MenuModalProps {
    isOpen: boolean
    setIsOpen: (b: boolean) => void
}

export const MenuModal = (props: MenuModalProps) => {
    const { isOpen, setIsOpen } = props

    const duration = useGetDuration()

    // settings
    const [selectedDuration, setSelectedDuration] = useState(duration)

    // const [settings, setSettings] = useState<Settings>(getSettings())

    const onSave = () => {
        handleSaveSettings(selectedDuration)
        setIsOpen(false)
    }

    return (
        <Modal
            style={{ marginTop: "-5rem", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", outline: "none" }}
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <Box
                style={{
                    padding: "2rem",
                    color: "white",
                    borderRadius: "20px",
                    background: COLOURS.darkBrown,
                    height: "400px",
                    width: "600px",
                    position: "relative",
                }}
            >
                <Box>
                    <Box style={{ marginBottom: "1rem" }}>Options Menu</Box>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                        <Box id="modal-modal-description">Duration (Seconds)</Box>
                        <Box display={"flex"}>
                            {[15, 30, 60, 69].map((d) => {
                                return (
                                    <Box
                                        style={{
                                            marginRight: "1rem",
                                            background: selectedDuration === d ? COLOURS.darkishBrown : "",
                                            padding: "7px",
                                            borderRadius: "5px",
                                            borderLeft: selectedDuration === d ? "2px solid " + COLOURS.lightBrown : "",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setSelectedDuration(d)}
                                    >
                                        {d}
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>

                {/* Bottom */}
                <Box
                    style={{
                        position: "absolute",
                        bottom: "1.5rem",
                        display: "flex",
                        right: "2rem",
                    }}
                >
                    <Button
                        style={{
                            backgroundColor: COLOURS.darkishBrown,
                            color: COLOURS.lightBrown,
                            borderRadius: "10px",
                            width: "50%",
                            marginRight: ".7rem",
                        }}
                        variant="contained"
                        onClick={onSave}
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
