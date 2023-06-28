import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "./Layout"
import { Box, Typography, makeStyles } from "@material-ui/core"
import { PlayerStatsGetResp, usePlayer } from "../containers/player"
import TestsTable from "../game/RecentTestsTable"

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
    avatarContainer: { display: "flex" },
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

function formatDate(dateStr: string): string {
    let dateObj = new Date(dateStr)
    let formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
    return formattedDate
}

export const ProfilePage = () => {
    const { playerID } = useParams<any>()
    const classes = useStyles()
    const [stats, setStats] = useState<PlayerStatsGetResp | undefined>()
    const { playerStatsQuery } = usePlayer(playerID)
    useEffect(() => {
        if (playerStatsQuery.data) {
            setStats(playerStatsQuery.data)
        }
    }, [playerStatsQuery.data, playerStatsQuery.error])

    return (
        <Layout>
            <Box
                style={{
                    overflowY: "auto",
                }}
            >
                <Box className={classes.top}>
                    {/* avatar and name */}
                    <Box className={classes.avatarContainer}>
                        <img className={classes.avatarDisplay} src="https://i.ibb.co/ccqpHZv/fire-astro.png" alt="" />
                        <Box>
                            <Typography className={classes.nameLabel} variant="h5">
                                {stats?.player?.username}
                            </Typography>
                            <Typography className={classes.DateLabel} variant="body1">
                                Tests Taken: coming soon!
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
                            <Typography className={classes.hiScoreBoxDuration}>30 secs</Typography>
                            <Typography className={classes.hiScoreBoxWPM} style={{ fontWeight: "bold" }}>
                                {(stats?.hi_score_15 ?? 0).toFixed(1)}
                            </Typography>
                            <Typography className={classes.hiScoreBoxWPMLabel}>WPM</Typography>
                        </Box>

                        <Box className={classes.averagesBox}>
                            <Typography className={classes.hiScoreBoxDuration}>60 secs</Typography>
                            <Typography className={classes.hiScoreBoxWPM} style={{ fontWeight: "bold" }}>
                                {(stats?.hi_score_30 ?? 0).toFixed(1)}
                            </Typography>
                            <Typography className={classes.hiScoreBoxWPMLabel}>WPM</Typography>
                        </Box>

                        <Box className={classes.averagesBox}>
                            <Typography className={classes.hiScoreBoxDuration}>120 secs</Typography>
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
                        <TestsTable userID={playerID} />
                    </Box>
                </Box>
            </Box>
        </Layout>
    )
}
