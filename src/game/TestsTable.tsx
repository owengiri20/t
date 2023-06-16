import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { getTests } from "../db"
import { Box } from "@material-ui/core"
import { COLOURS } from "./CommonStyles"

export default function TestsTable() {
    const rows = getTests()

    return (
        <TableContainer component={Box}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>WPM</TableCell>
                        <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>Duration</TableCell>
                        <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>C/I</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell style={{ fontSize: "16px", color: "white" }} component="th" scope="row">
                                {row.wpm}
                            </TableCell>
                            <TableCell style={{ fontSize: "16px", color: "white" }}>{row.duration}</TableCell>
                            <TableCell style={{ fontSize: "16px", color: "white" }}>
                                {row.correctWords}/{row.incorrectWords}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box style={{ color: "white", width: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>recent tests stats</Box>
        </TableContainer>
    )
}
