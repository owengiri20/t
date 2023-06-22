import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { User, useAuth } from "../containers/auth"
import { Box, makeStyles, useMediaQuery } from "@material-ui/core"
import { COLOURS } from "../game/CommonStyles"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

export default function UserMenu({ user }: { user: User }) {
    const under1100Height = useMediaQuery("(max-height:1100px)")
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const { logoutFn } = useAuth()
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        logoutFn.mutate()
    }

    return (
        <div>
            <Button
                style={{
                    display: "flex",
                    padding: "1rem",
                    alignItems: "center",
                    borderRadius: "30px",
                    background: COLOURS.darkBrown,
                    color: COLOURS.lightBrown,
                    width: "fit-content",
                    marginTop: under1100Height ? "0" : "2rem",
                    cursor: "pointer",
                    fontSize: "15px",
                }}
                onClick={handleClick}
            >
                <AccountCircleIcon style={{ marginRight: "1rem", color: COLOURS.lightBrown, fontSize: "35px" }} /> {user.username}
            </Button>
            <Menu
                sx={{ mt: ".1rem", "& .MuiMenu-paper": { backgroundColor: "black", color: COLOURS.lightBrown, width: "7rem" } }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}
