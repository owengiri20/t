import { useMediaQuery } from "@material-ui/core"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import * as React from "react"
import { User, useAuth } from "../containers/auth"
import { COLOURS } from "../game/CommonStyles"
import { useHistory } from "react-router-dom"

export default function UserMenu({ user }: { user: User }) {
    const history = useHistory()
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
                    borderRadius: "15px",
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
                sx={{ mt: ".1rem", "& .MuiMenu-paper": { backgroundColor: COLOURS.darkBrown, color: COLOURS.lightBrown, width: "10rem" } }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem
                    onClick={() => {
                        history.push(`/profile/${user.ID}`)
                        handleClose()
                    }}
                >
                    Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}
