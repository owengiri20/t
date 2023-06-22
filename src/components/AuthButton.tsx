import { Box } from "@material-ui/core"
import React from "react"
import { COLOURS } from "../game/CommonStyles"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

interface AuthButtonProps {
    style: React.CSSProperties
    classes: string
    onClick: () => void
}

export const AuthButton = (props: AuthButtonProps) => {
    const { style, classes, onClick } = props
    return (
        <Box onClick={onClick} style={style} className={classes}>
            <AccountCircleIcon style={{ marginRight: "1rem", color: COLOURS.lightBrown, fontSize: "35px" }} />
            <Box
                style={{
                    userSelect: "none",
                    fontSize: "15px",
                }}
            >
                Login
            </Box>
        </Box>
    )
}
