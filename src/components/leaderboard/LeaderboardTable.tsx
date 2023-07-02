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

interface UserListReq {
    duration: number
}

interface LeaderboardObject {
    test_result: TestResult
    user: User
}

const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff",
        },
    },
}))

export default function LeaderboardTableHighestWPM({ limit }: { limit?: number }) {
    const [pageNum, setPageNum] = useState(0)
    const [offset, setOffset] = useState(0)

    const [filter, setFilter] = useState<UserListReq>({ duration: 15 })

    const [users, setUsers] = useState<LeaderboardObject[]>()
    const classes = useStyles()
    const history = useHistory()

    // query users results
    const { refetch } = useQuery({
        queryKey: ["leaderboard", filter],
        queryFn: async ({ queryKey }) => {
            const [_key, _filter, _offset] = queryKey
            const params = new URLSearchParams({
                duration: filter.duration.toString(),
            })

            const res = await fetchData(`/leaderboard/highest-wpm?${params.toString()}`, "GET", null)
            const data = await res.json()

            console.log("heloo", data)

            if (data.error) {
                throw new Error(data.error)
            }
            setUsers(data as LeaderboardObject[])
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
        <TableContainer
            component={Box}
            style={{
                overflowY: "auto",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "2.6rem" }}>
                <Typography mx="1rem" variant="h5">
                    Highest WPM Per User
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
                                        <img
                                            style={{ borderRadius: "13px", marginRight: "1rem", width: "3rem", height: "3rem" }}
                                            src={row.user.avatar?.url}
                                            alt=""
                                        />{" "}
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
    )
}
