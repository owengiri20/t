import RefreshIcon from "@mui/icons-material/Refresh"
import SettingsIcon from "@mui/icons-material/Settings"
import React, { useRef, useState } from "react"
import { COLOURS } from "../game/CommonStyles"
import { MenuModal } from "./MenuModal"
import { Box, Button, Tooltip } from "@material-ui/core"
import { useGame } from "../containers/game"
import useHotkeys from "@reecelucas/react-use-hotkeys"
import { GameContainer } from "../game/GameContainer"

import "../assets/coolBorder.css"

const bs =
    "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"

export const GamePage = () => {
    const [optionsMenuOpen, setOptionsMenuOpen] = useState(false)
    const { hideSettings, resetState, GAME_STATE } = useGame()

    const childRef = useRef<HTMLInputElement>(null)

    const handleTabKey = () => {
        if (childRef.current) {
            childRef.current.focus()
        }
    }

    useHotkeys("Tab", () => {
        handleTabKey()
    })

    return (
        <Box
            sx={{
                marginTop: "2rem",
                width: "100%",
                display: "flex",
                height: "100%",
                flexDirection: "column",
            }}
            style={{
                borderRadius: "30px",
                background: "linear-gradient(to top, #0d0a06, #0A0603 80%)",
                boxShadow: bs,
            }}
        >
            <Box sx={{ display: "flex", marginBottom: "1rem" }}>
                {GAME_STATE.status === "finished" && (
                    <Box sx={{ marginTop: "2rem", marginLeft: "2.2rem", marginRight: "auto" }}>
                        <Button
                            className="cool-border"
                            style={{
                                border: "2px solid " + COLOURS.lightBrown,
                                backgroundColor: COLOURS.darkishBrown,
                                color: "white",
                                borderRadius: "10px",
                                width: "11rem",
                                fontWeight: "bold",
                                height: "fit-content",
                                padding: "1rem",
                            }}
                            variant="contained"
                            onClick={() => resetState()}
                        >
                            Play Again
                        </Button>
                    </Box>
                )}
                <Box sx={{ marginTop: "2rem", marginLeft: "auto", marginRight: "3rem" }}>
                    <RefreshIcon onClick={() => resetState()} style={{ marginRight: "1rem", color: COLOURS.lightBrown, fontSize: "35px", cursor: "pointer" }} />

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
            </Box>

            <GameContainer />
            <MenuModal isOpen={optionsMenuOpen} setIsOpen={setOptionsMenuOpen} />
        </Box>
    )
}
