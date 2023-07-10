import { Box, Modal, Tooltip, Typography, makeStyles } from "@material-ui/core"
import EditIcon from "@mui/icons-material/Edit"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useMutation, useQuery } from "@tanstack/react-query"
import { enqueueSnackbar } from "notistack"
import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { User, useAuth } from "../containers/auth"
import { Avatar, PlayerStatsGetResp, usePlayer } from "../containers/player"
import { COLOURS } from "../game/CommonStyles"
import TestsTable from "../game/RecentTestsTable"
import { fetchData, formatDate, getErrorMessge } from "../utils"
import { Layout } from "./Layout"

const useStyles = makeStyles({
    top: {
        display: "flex",
        marginLeft: "4.5rem",
        marginBottom: "2rem",
    },
    bottomContainer: {
        display: "flex",
        height: "18rem",
        justifyContent: "center",
        marginBottom: "2rem",
        paddingLeft: "4rem",
        paddingRight: "4rem",
        flexDirection: "column",
    },
    bottom: {
        display: "flex",
        height: "18rem",
        justifyContent: "center",
    },
    bottomTable: {
        display: "flex",
        height: "fit-content",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
    },
    avatarContainer: { display: "flex", width: "100%" },
    avatarDisplay: {
        borderRadius: "10px",
        height: "15rem",
        width: "15rem",
        marginTop: "1rem",
        marginRight: "1rem",
    },
    nameLabel: {
        color: "white",
        background: "black",
        padding: "1rem",
        marginTop: "1rem",
        fontWeight: "bold",
    },
    DateLabel: {
        padding: ".5rem",
        color: "white",
        marginTop: ".1rem",
        fontWeight: "bold",
    },
    averagesBox: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid white",
        borderRadius: "10px",
        width: "100%",
        marginLeft: ".5rem",
        marginRight: ".5rem",
    },
    hiScoreBox: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid white",
        borderRadius: "10px",
        width: "100%",
        marginLeft: ".5rem",
        marginRight: ".5rem",
    },
    hiScoreBoxDuration: {
        fontSize: "1.8rem",
        color: "white",
    },
    hiScoreBoxWPM: {
        fontSize: "2.6rem",
        color: "white",
    },
    hiScoreBoxWPMLabel: {
        fontSize: "1rem",
        color: "white",
    },
    sectionTitle: {
        fontSize: "1.5rem",
        color: "white",
    },
})

export const ProfilePage = () => {
    const { playerID } = useParams<any>()
    const { user } = useAuth()

    const [editModalOpen, setEditModalOpen] = useState(false)

    const classes = useStyles()
    const [stats, setStats] = useState<PlayerStatsGetResp | undefined>()
    const { playerStatsQuery } = usePlayer(playerID)
    useEffect(() => {
        if (playerStatsQuery.data) {
            setStats(playerStatsQuery.data)
        }
    }, [playerStatsQuery.data, playerStatsQuery.error])

    return (
        <>
            <Layout>
                <Box
                    style={{
                        overflowY: "auto",
                    }}
                >
                    <Box className={classes.top}>
                        {/* avatar and name */}
                        <Box className={classes.avatarContainer}>
                            <img className={classes.avatarDisplay} src={stats?.player?.avatar?.url ?? ""} alt="" />
                            <Box width={"100%"}>
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography className={classes.nameLabel} variant="h5">
                                        {stats?.player?.username}
                                    </Typography>
                                    {user?.ID.toString() === playerID.toString() && (
                                        <Tooltip placement="top-start" style={{ cursor: "default" }} title={"Edit Profile Details"}>
                                            <EditIcon
                                                onClick={() => {
                                                    setEditModalOpen(true)
                                                }}
                                                style={{
                                                    border: "2px solid white",
                                                    borderRadius: "10px",
                                                    padding: ".4rem",
                                                    marginRight: "3rem",
                                                    color: "#fff",
                                                    fontSize: "40px",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </Tooltip>
                                    )}
                                </Box>

                                <Typography className={classes.DateLabel} variant="body1">
                                    Tests Completed: {stats?.tests_completed ?? "n/a"}
                                </Typography>
                                <Typography className={classes.DateLabel} variant="body1">
                                    Joined {formatDate(stats?.player?.joined ?? "")}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.bottomContainer}>
                        <Typography className={classes.sectionTitle} style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight: "bold" }}>
                            Averages.
                        </Typography>
                        {/* averages */}
                        <Box className={classes.bottom}>
                            <Box className={classes.averagesBox}>
                                <Typography className={classes.hiScoreBoxDuration}>15 secs</Typography>
                                <Typography className={classes.hiScoreBoxWPM} style={{ fontWeight: "bold" }}>
                                    {(stats?.avg_15 ?? 0).toFixed(1)}
                                </Typography>
                                <Typography className={classes.hiScoreBoxWPMLabel}>WPM</Typography>
                            </Box>
                            <Box className={classes.averagesBox}>
                                <Typography className={classes.hiScoreBoxDuration}>30 secs</Typography>
                                <Typography className={classes.hiScoreBoxWPM} style={{ fontWeight: "bold" }}>
                                    {(stats?.avg_30 ?? 0).toFixed(1)}
                                </Typography>
                                <Typography className={classes.hiScoreBoxWPMLabel}>WPM</Typography>
                            </Box>

                            <Box className={classes.averagesBox}>
                                <Typography className={classes.hiScoreBoxDuration}>60 secs</Typography>
                                <Typography className={classes.hiScoreBoxWPM} style={{ fontWeight: "bold" }}>
                                    {(stats?.avg_60 ?? 0).toFixed(1)}
                                </Typography>
                                <Typography className={classes.hiScoreBoxWPMLabel}>WPM</Typography>
                            </Box>

                            <Box className={classes.averagesBox}>
                                <Typography className={classes.hiScoreBoxDuration}>120 secs</Typography>
                                <Typography className={classes.hiScoreBoxWPM} style={{ fontWeight: "bold" }}>
                                    {(stats?.avg_120 ?? 0).toFixed(1)}
                                </Typography>
                                <Typography className={classes.hiScoreBoxWPMLabel}>WPM</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box className={classes.bottomContainer}>
                        <Typography className={classes.sectionTitle} style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight: "bold" }}>
                            Hi-scores.
                        </Typography>
                        {/* averages */}
                        <Box className={classes.bottom}>
                            <Box className={classes.averagesBox}>
                                <Typography className={classes.hiScoreBoxDuration}>15 secs</Typography>
                                <Typography className={classes.hiScoreBoxWPM} style={{ fontWeight: "bold" }}>
                                    {(stats?.hi_score_15 ?? 0).toFixed(1)}
                                </Typography>
                                <Typography className={classes.hiScoreBoxWPMLabel}>WPM</Typography>
                            </Box>

                            <Box className={classes.averagesBox}>
                                <Typography className={classes.hiScoreBoxDuration}>30 secs</Typography>
                                <Typography className={classes.hiScoreBoxWPM} style={{ fontWeight: "bold" }}>
                                    {(stats?.hi_score_30 ?? 0).toFixed(1)}
                                </Typography>
                                <Typography className={classes.hiScoreBoxWPMLabel}>WPM</Typography>
                            </Box>

                            <Box className={classes.averagesBox}>
                                <Typography className={classes.hiScoreBoxDuration}>60 secs</Typography>
                                <Typography className={classes.hiScoreBoxWPM} style={{ fontWeight: "bold" }}>
                                    {(stats?.hi_score_60 ?? 0).toFixed(1)}
                                </Typography>
                                <Typography className={classes.hiScoreBoxWPMLabel}>WPM</Typography>
                            </Box>

                            <Box className={classes.averagesBox}>
                                <Typography className={classes.hiScoreBoxDuration}>120 secs</Typography>
                                <Typography className={classes.hiScoreBoxWPM} style={{ fontWeight: "bold" }}>
                                    {(stats?.hi_score_120 ?? 0).toFixed(1)}
                                </Typography>
                                <Typography className={classes.hiScoreBoxWPMLabel}>WPM</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box className={classes.bottomTable}>
                        <Box height={"100%"} width={"90%"}>
                            <Typography className={classes.sectionTitle} style={{ marginLeft: "1rem", marginBottom: "1rem", fontWeight: "bold" }}>
                                Recent Perfomances
                            </Typography>
                            <TestsTable limit={20} userID={playerID} />
                        </Box>
                    </Box>
                </Box>
            </Layout>
            {user && <EditProfileModal refetch={() => playerStatsQuery.refetch()} player={user} open={editModalOpen} setIsOpen={setEditModalOpen} />}
        </>
    )
}

interface FormVals {
    newUsername: string
    avatarID?: number
}
const EditProfileModal = ({ refetch, open, setIsOpen, player }: { refetch: () => void; player: User; open: boolean; setIsOpen: (b: boolean) => void }) => {
    const [formVals, setFormVals] = useState<FormVals>({
        newUsername: player.username,
        avatarID: player.avatar?.ID,
    })

    // update mutation
    const { mutate } = useMutation({
        mutationKey: ["update-profile"],
        mutationFn: async ({ newUsername, avatarID }: { newUsername: string; avatarID?: number }) => {
            const res = await fetchData("/player", "PUT", {
                newUsername,
                avatarID,
            })

            const data = await res.json()
            if (data.error) throw new Error(data.error)
            return data
        },
        onSuccess: (data) => {
            enqueueSnackbar("Details updated successfully!", {
                variant: "success",
                autoHideDuration: 3000,
            })

            setIsOpen(false)
            refetch()
        },
        onError: (error) => {
            enqueueSnackbar(getErrorMessge(error), {
                variant: "error",
                autoHideDuration: 3000,
            })
        },
    })

    // query avatars
    const avatarsQ = useQuery({
        queryKey: ["list-avatars"],
        queryFn: async () => {
            const res = await fetchData("/avatars", "GET", undefined)
            const data = await res.json()
            if (data.error) throw new Error(data.error)

            // set data here
            return data as Avatar[]
        },
        onError: (error) => {
            enqueueSnackbar(getErrorMessge(error), {
                variant: "error",
                autoHideDuration: 3000,
            })
        },
    })

    const dispalyedAvatar = useCallback(
        (id: number) => {
            if (!avatarsQ || !avatarsQ.data) {
                return null
            }

            return avatarsQ.data.find((d) => d.ID === id)
        },
        [avatarsQ.data],
    )

    const handleSave = () => {
        if (!formVals.newUsername) {
            enqueueSnackbar("Username cannot be empty.", {
                variant: "error",
                autoHideDuration: 3000,
            })
            return
        }

        mutate({ newUsername: formVals.newUsername, avatarID: formVals.avatarID })
    }

    return (
        <Modal
            style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", outline: "none" }}
            open={open}
            onClose={() => setIsOpen(false)}
        >
            <Box
                style={{
                    padding: "2rem",
                    color: "white",
                    borderRadius: "20px",
                    background: COLOURS.darkBrown,
                    height: "600px",
                    width: "70%",
                    maxWidth: "1000px",
                    position: "relative",
                }}
            >
                <Box style={{ marginBottom: "2rem", fontSize: "1.2rem" }}>Edit Profile Details</Box>
                <TextField
                    onChange={(e) => setFormVals((prev) => ({ ...prev, newUsername: e.target.value }))}
                    id="outlined-basic"
                    label="Username"
                    variant="filled"
                    value={formVals.newUsername}
                    placeholder="fill username"
                    style={{ marginTop: "1rem", marginBottom: "2rem", width: "100%" }}
                />

                <Box style={{ marginBottom: "2rem", fontSize: "1rem" }}>Select Avatar</Box>
                <Box sx={{ display: "flex" }}>
                    <Box>
                        <img
                            style={{ marginRight: "1rem", width: "200px", height: "200px", borderRadius: "10px", border: "1px solid white" }}
                            src={dispalyedAvatar(formVals.avatarID ?? 0) ? dispalyedAvatar(formVals.avatarID ?? 0)?.url : ""}
                            alt=""
                        />
                        <Typography variant="caption" display="block">
                            Selected avatar
                        </Typography>
                    </Box>

                    {avatarsQ.isLoading || !avatarsQ.data ? (
                        <Box>Loading...</Box>
                    ) : (
                        <Box style={{ overflowX: "auto" }} sx={{ flex: 1, display: "flex", flexWrap: "nowrap" }}>
                            <>
                                {avatarsQ.data.map((n) => {
                                    return (
                                        <img
                                            onClick={() => {
                                                setFormVals((prev) => ({ ...prev, avatarID: n.ID }))
                                            }}
                                            key={n.url}
                                            style={{
                                                border: formVals.avatarID === n.ID ? "1px solid white" : "",
                                                cursor: "pointer",
                                                marginRight: "1rem",
                                                width: "180px",
                                                height: "180px",
                                                padding: "1rem",
                                                borderRadius: "10px",
                                            }}
                                            src={n.url}
                                            alt=""
                                        />
                                    )
                                })}
                            </>
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        bottom: "2rem",
                        right: "2rem",
                    }}
                >
                    <Button
                        style={{
                            backgroundColor: COLOURS.fadedGreen,
                            color: "white",
                            borderRadius: "10px",
                            marginRight: ".7rem",
                        }}
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                    <Button
                        style={{
                            backgroundColor: COLOURS.darkishBrown,
                            color: COLOURS.lightBrown,
                            borderRadius: "10px",
                        }}
                        variant="contained"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
