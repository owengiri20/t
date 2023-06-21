import { Box } from "@material-ui/core"
import React, { useState } from "react"
import { Game } from "../game/Game"
import SettingsIcon from "@mui/icons-material/Settings"
import HomeIcon from "@mui/icons-material/Home"
import RefreshIcon from "@mui/icons-material/Refresh"
import { COLOURS } from "../game/CommonStyles"
import { MenuModal } from "./MenuModal"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [optionsMenuOpen, setOptionsMenuOpen] = useState(false)
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
                <SettingsIcon
                    onClick={() => setOptionsMenuOpen(true)}
                    style={{ marginRight: "1rem", color: COLOURS.lightBrown, fontSize: "35px", cursor: "pointer" }}
                />
                {/* <HomeIcon style={{ color: COLOURS.lightBrown, fontSize: "35px", cursor: "pointer" }} /> */}
            </Box>
            {children}
        </Box>
    )
}
