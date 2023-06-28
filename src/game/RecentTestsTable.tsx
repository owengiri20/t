import { Box, Tooltip } from "@material-ui/core"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import * as React from "react"
import { getTests } from "../db"
import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../utils"
import { enqueueSnackbar } from "notistack"
interface ListTestReq {
    limit: number
    sort_by: string
    user_id: string
}

interface TestResutlsResp {
    total: number
    rows: TestResult[]
}

interface TestResult {
    ID: number
    CreatedAt: string
    user_id: number
    wpm: number
    duration_secs: number
    correct_words_count: number
    incorrect_words_count?: number
}

export default function TestsTable({ userID, limit }: { userID?: string; limit?: number }) {
    const [filter] = React.useState<ListTestReq>({ limit: limit ?? 5, sort_by: "created_at", user_id: userID ?? "" })

    const [testsFromDB, setTestsFromDB] = React.useState<TestResutlsResp>()

    // query test results
    useQuery({
        queryKey: ["test-results", filter],
        queryFn: async () => {
            const res = await fetchData(`/test-results?limit=${filter.limit}&sort_by=${filter.sort_by}&user_id=${filter.user_id}`, "GET", null)
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setTestsFromDB(data as TestResutlsResp)
            return data
        },
        onError: (error: any) => {
            enqueueSnackbar("Failed to fetch test results.", {
                variant: "error",
                autoHideDuration: 3000,
            })
            return error
        },
        enabled: !!userID,
    })

    const testsFromLocalStorage = getTests()

    return (
        <TableContainer component={Box}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>
                            <Tooltip placement="top-start" style={{ cursor: "default" }} title="Words Per Minute">
                                <Box>WPM</Box>
                            </Tooltip>
                        </TableCell>

                        <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>
                            <Tooltip placement="top-start" style={{ cursor: "default" }} title="Duration in seconds">
                                <Box>Duration</Box>
                            </Tooltip>
                        </TableCell>
                        <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>
                            <Tooltip placement="top-start" style={{ cursor: "default" }} title="Correct/Incorrect Words">
                                <Box>C/I</Box>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userID &&
                        testsFromDB &&
                        testsFromDB.rows &&
                        testsFromDB.rows.map((row, idx) => (
                            <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell style={{ fontSize: "16px", color: "white" }} component="th" scope="row">
                                    {row.wpm}
                                </TableCell>
                                <TableCell style={{ fontSize: "16px", color: "white" }}>{row.duration_secs} secs</TableCell>
                                <TableCell style={{ fontSize: "16px", color: "white" }}>
                                    {row.correct_words_count}/{row.incorrect_words_count}
                                </TableCell>
                            </TableRow>
                        ))}

                    {!userID &&
                        testsFromLocalStorage.map((row, idx) => (
                            <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell style={{ fontSize: "16px", color: "white" }} component="th" scope="row">
                                    {row.wpm}
                                </TableCell>
                                <TableCell style={{ fontSize: "16px", color: "white" }}>{row.duration} secs</TableCell>
                                <TableCell style={{ fontSize: "16px", color: "white" }}>
                                    {row.correctWords}/{row.incorrectWords}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
