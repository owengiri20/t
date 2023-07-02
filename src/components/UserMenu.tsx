import { Box, Modal, useMediaQuery } from "@material-ui/core"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import * as React from "react"
import { useHistory } from "react-router-dom"
import { User, useAuth } from "../containers/auth"
import { COLOURS } from "../game/CommonStyles"

export default function UserMenu({ user }: { user: User }) {
    const history = useHistory()
    const under1100Height = useMediaQuery("(max-height:1100px)")
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const { logoutFn } = useAuth()
    const [logoutModalOpen, setLogoutModalOpen] = React.useState(false)

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
        <>
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
                {user.username}

                {!user.avatar ? (
                    <AccountCircleIcon style={{ marginLeft: "1rem", color: COLOURS.lightBrown, fontSize: "35px" }} />
                ) : (
                    <img style={{ height: "3.5rem", width: "3.5rem", marginLeft: "1rem", borderRadius: "10px" }} src={user.avatar.url} alt="user's avatar" />
                )}
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
                {user.is_admin && <MenuItem onClick={() => history.push("/admin")}>ADMIN</MenuItem>}
                <MenuItem
                    onClick={() => {
                        history.push(`/profile/${user.ID}`)
                        handleClose()
                    }}
                >
                    Profile
                </MenuItem>
                <MenuItem onClick={() => setLogoutModalOpen(true)}>Logout</MenuItem>
            </Menu>

            {/* are you sure logout modal  */}
            <Modal
                style={{ marginTop: "-15rem", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", outline: "none" }}
                open={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
            >
                <Box
                    style={{
                        padding: "2rem",
                        color: "white",
                        borderRadius: "20px",
                        background: COLOURS.darkBrown,
                        height: "fit-content",
                        width: "fit-content",
                        position: "relative",
                        textAlign: "center",
                    }}
                >
                    <Box style={{ marginBottom: "2rem", fontSize: "1.2rem" }}>Are you sure you want to logout?</Box>

                    <Button
                        style={{
                            backgroundColor: COLOURS.fadedRed,
                            color: "white",
                            borderRadius: "10px",
                            marginRight: ".7rem",
                        }}
                        variant="contained"
                        onClick={handleLogout}
                    >
                        Yes Logout
                    </Button>
                    <Button
                        style={{
                            backgroundColor: COLOURS.darkishBrown,
                            color: COLOURS.lightBrown,
                            borderRadius: "10px",
                        }}
                        variant="contained"
                        onClick={() => setLogoutModalOpen(false)}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </>
    )
}
