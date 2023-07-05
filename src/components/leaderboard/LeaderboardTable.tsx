import { Box, Tooltip, makeStyles } from "@material-ui/core"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography/Typography"
import { useQuery } from "@tanstack/react-query"
import { enqueueSnackbar } from "notistack"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { User } from "../../containers/auth"
import { TestResult } from "../../containers/player"
import { fetchData, formatToDateTimeString } from "../../utils"
import { COLOURS } from "../../game/CommonStyles"

interface LeadbordReq {
    duration: number
}

interface LeaderboardObject {
    test_result: TestResult
    user: User
}

interface LeaderboardTableProps {
    limit?: number
    endpoint: string
    title?: string
    key: string
}

interface Top3 {
    pos1: LeaderboardObject
    pos2?: LeaderboardObject
    pos3?: LeaderboardObject
}
export default function LeaderboardTable({ limit, endpoint, title, key }: LeaderboardTableProps) {
    const [filter, setFilter] = useState<LeadbordReq>({ duration: 15 })
    const [users, setUsers] = useState<LeaderboardObject[]>()
    const [top3, setTop3] = useState<Top3>()

    const history = useHistory()

    // query users results
    useQuery({
        queryKey: ["leaderboard-" + key, filter],
        queryFn: async ({ queryKey }) => {
            const [_key, _filter, _offset] = queryKey
            const params = new URLSearchParams({
                duration: filter.duration.toString(),
            })

            const res = await fetchData(`${endpoint}?${params.toString()}`, "GET", null)
            const data = await res.json()

            if (data.error) {
                throw new Error(data.error)
            }
            const resp = data as LeaderboardObject[]
            setUsers(resp)

            if (resp.length > 0) {
                const t3: Top3 = { pos1: resp[0] }

                if (resp[1]) {
                    t3.pos2 = resp[1]
                }

                if (resp[2]) {
                    t3.pos3 = resp[2]
                }

                setTop3(t3)
            }
            return data
        },
        onError: (error: any) => {
            enqueueSnackbar("Failed to fetch users.", {
                variant: "error",
                autoHideDuration: 3000,
            })
            return error
        },
    })

    const onRowClick = (playerID: string) => {
        history.push(`/profile/${playerID}`)
    }

    return (
        <>
            <TableContainer
                component={Box}
                style={{
                    overflowY: "auto",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: "1rem",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <Typography mx="1rem" variant="h5">
                        {title}
                    </Typography>

                    <FormControl sx={{ marginTop: "1rem" }}>
                        <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                        <Select
                            sx={{ width: "20rem", color: "white" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter.duration}
                            label="Age"
                            onChange={(e) => {
                                const dur = e.target.value as any as number
                                setFilter((prev) => ({ ...prev, duration: dur }))
                            }}
                        >
                            <MenuItem sx={{ width: "20rem" }} value={15}>
                                15 secs
                            </MenuItem>
                            <MenuItem sx={{ width: "20rem" }} value={30}>
                                30 secs
                            </MenuItem>
                            <MenuItem sx={{ width: "20rem" }} value={60}>
                                60 secs
                            </MenuItem>
                            <MenuItem sx={{ width: "20rem" }} value={120}>
                                120 secs
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: "1rem" }}>
                    {/* pos3 */}
                    <Box
                        sx={{ height: "7rem", flex: 1 }}
                        style={{
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                            borderTop: "20px solid #88540b", //  #c7d1da
                            backgroundColor: COLOURS.podium,
                            margin: "1rem",
                            position: "relative",
                        }}
                    >
                        <Box
                            style={{
                                position: "absolute",
                                top: "-3.5rem",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        >
                            <img
                                style={{
                                    border: "2.5px solid #88540b",
                                    height: "5rem",
                                    width: "5rem",
                                    borderRadius: "10px",
                                }}
                                src={top3?.pos3?.user.avatar?.url}
                                alt=""
                            />
                        </Box>
                        <Typography marginTop={"2rem"} textAlign={"center"}>
                            {top3?.pos3?.user.username ?? "N/A"}
                        </Typography>
                    </Box>

                    {/* pos1 */}
                    <Box
                        sx={{ height: "10rem", flex: 1 }}
                        style={{
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                            borderTop: "20px solid  #d4af37",
                            backgroundColor: COLOURS.podium,
                            margin: "1rem",
                            position: "relative",
                        }}
                    >
                        <Box
                            style={{
                                position: "absolute",
                                top: "-3.5rem",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        >
                            <img
                                style={{
                                    height: "5rem",
                                    width: "5rem",
                                    borderRadius: "10px",
                                    border: "2.5px solid #d4af37",
                                }}
                                src={top3?.pos1?.user.avatar?.url}
                                alt=""
                            />
                        </Box>
                        <Typography marginTop={"2rem"} textAlign={"center"}>
                            {top3?.pos1?.user.username ?? "N/A"}
                        </Typography>
                    </Box>
                    {/* pos3 */}
                    <Box
                        sx={{ height: "8rem", flex: 1 }}
                        style={{
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                            borderTop: "20px solid #b4b6b4",
                            backgroundColor: COLOURS.podium,
                            margin: "1rem",
                            position: "relative",
                        }}
                    >
                        <Box
                            style={{
                                position: "absolute",
                                top: "-3.5rem",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        >
                            <img
                                style={{
                                    height: "5rem",
                                    width: "5rem",
                                    borderRadius: "10px",
                                    border: "2.5px solid #b4b6b4",
                                }}
                                src={top3?.pos2?.user.avatar?.url}
                                alt=""
                            />
                        </Box>
                        <Typography marginTop={"2rem"} textAlign={"center"}>
                            {top3?.pos2?.user.username ?? "N/A"}
                        </Typography>
                    </Box>
                </Box>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>
                                <Tooltip placement="top-start" style={{ cursor: "default" }} title="">
                                    <Box>User</Box>
                                </Tooltip>
                            </TableCell>
                            <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>
                                <Tooltip placement="top-start" style={{ cursor: "default" }} title="Words Per Minute">
                                    <Box>WPM</Box>
                                </Tooltip>
                            </TableCell>
                            <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>
                                <Tooltip placement="top-start" style={{ cursor: "default" }} title="">
                                    <Box>Date/Time</Box>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users &&
                            users.map((row, idx) => (
                                <TableRow key={idx} sx={{ cursor: "pointer", "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell onClick={() => onRowClick(row.user.ID)} style={{ fontSize: "16px", color: "white" }} component="th" scope="row">
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Typography>{idx + 1}.</Typography>
                                            <img
                                                style={{ borderRadius: "13px", marginRight: "1rem", marginLeft: ".6rem", width: "3rem", height: "3rem" }}
                                                src={row.user.avatar?.url}
                                                alt=""
                                            />
                                            <Typography>{row.user.username}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell
                                        onClick={() => onRowClick(row.user.ID)}
                                        style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
                                        component="th"
                                        scope="row"
                                    >
                                        {row.test_result.wpm}
                                    </TableCell>
                                    <TableCell onClick={() => onRowClick(row.user.ID)} style={{ fontSize: "16px", color: "white" }} component="th" scope="row">
                                        {formatToDateTimeString(row?.test_result.CreatedAt ?? "")}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
