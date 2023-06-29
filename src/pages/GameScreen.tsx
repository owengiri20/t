import RefreshIcon from "@mui/icons-material/Refresh"
import SettingsIcon from "@mui/icons-material/Settings"
import React, { useRef, useState } from "react"
import { COLOURS } from "../game/CommonStyles"
import { Game } from "../game/Game"
import { MenuModal } from "./MenuModal"
import { Box, Tooltip } from "@material-ui/core"
import { useGame } from "../containers/game"
import useHotkeys from "@reecelucas/react-use-hotkeys"

export const GameScreen = () => {
    const [optionsMenuOpen, setOptionsMenuOpen] = useState(false)
    const { hideSettings } = useGame()

    const childRef = useRef<HTMLInputElement>(null)

    const handleTabKey = () => {
        console.log("hello 1")

        if (childRef.current) {
            console.log("hello 2")

            childRef.current.focus()
        }
    }

    useHotkeys("Tab", () => {
        console.log("Some action")
        handleTabKey()
    })

    return (
        <Box
            sx={{
                margin: "auto",
                marginTop: "3rem",
                height: "90vh",
                maxHeight: "800px",
                maxWidth: "1300px",
                display: "flex",
                flexDirection: "column",
            }}
            style={{
                borderRadius: "30px",
                background: "linear-gradient(to top, #0d0a06, #0A0603 80%)",
                boxShadow:
                    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            }}
        >
            <Box sx={{ marginTop: "2rem", marginLeft: "auto", marginRight: "3rem" }}>
                <RefreshIcon
                    onClick={() => window.location.reload()}
                    style={{ marginRight: "1rem", color: COLOURS.lightBrown, fontSize: "35px", cursor: "pointer" }}
                />

                <Tooltip
                    placement="top-start"
                    style={{ cursor: "default" }}
                    title={hideSettings ? "cannot change settings whilst playing or on finish page" : ""}
                >
                    <SettingsIcon
                        onClick={() => (hideSettings ? null : setOptionsMenuOpen(true))}
                        style={{ opacity: hideSettings ? ".6" : "1", marginRight: "1rem", color: COLOURS.lightBrown, fontSize: "35px", cursor: "pointer" }}
                    />
                </Tooltip>
            </Box>
            <Game />
            <MenuModal isOpen={optionsMenuOpen} setIsOpen={setOptionsMenuOpen} />
        </Box>
    )
}
