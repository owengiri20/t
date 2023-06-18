import { Box, Tooltip } from "@material-ui/core"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import * as React from "react"
import { getTests } from "../db"

export default function TestsTable() {
    const rows = getTests()

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
                    {rows.map((row, idx) => (
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
            <Box style={{ color: "white", width: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>Recent Tests</Box>
        </TableContainer>
    )
}
