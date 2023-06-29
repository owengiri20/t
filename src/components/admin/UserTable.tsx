import { Box, Tooltip, makeStyles } from "@material-ui/core"
import TablePagination from "@mui/material/TablePagination"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useQuery } from "@tanstack/react-query"
import { enqueueSnackbar } from "notistack"
import { fetchData, formatDate } from "../../utils"
import { User } from "../../containers/auth"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography/Typography"
import { useEffect, useState } from "react"
import React from "react"
import { useHistory } from "react-router-dom"

interface UserListReq {
    limit: number
    sort_by: string
    search: string
}

interface UserListResp {
    total: number
    rows: User[]
}

const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff",
        },
    },
}))

export default function AdminUsersTable({ userID, limit }: { userID?: string; limit?: number }) {
    const [pageNum, setPageNum] = useState(0)
    const [offset, setOffset] = useState(0)

    const [filter, setFilter] = useState<UserListReq>({ limit: limit ?? 5, sort_by: "created_at", search: "" })
    const [inputValue, setInputValue] = useState(filter.search)
    const [debouncedValue, setDebouncedValue] = useState(filter.search)

    const [users, setUsers] = useState<UserListResp>()
    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(inputValue)
        }, 500) // 500ms delay

        return () => {
            clearTimeout(timerId)
        }
    }, [inputValue])

    useEffect(() => {
        setFilter({
            ...filter,
            search: debouncedValue,
        })
    }, [debouncedValue])

    // query users results
    const { refetch } = useQuery({
        queryKey: ["admin-users", filter, offset],
        queryFn: async ({ queryKey }) => {
            const [_key, _filter, _offset] = queryKey
            const params = new URLSearchParams({
                search: filter.search,
                offset: _offset.toString(),
                limit: filter.limit.toString(),
                sort_by: filter.sort_by ?? "",
            })

            const res = await fetchData(`/admin/users?${params.toString()}`, "GET", null)
            const data = await res.json()

            if (data.error) {
                throw new Error(data.error)
            }
            setUsers(data as UserListResp)
            return data
        },
        onError: (error: any) => {
            enqueueSnackbar("Failed to fetch users.", {
                variant: "error",
                autoHideDuration: 3000,
            })
            return error
        },
        enabled: !!userID,
    })

    return (
        <TableContainer component={Box} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography mx="1rem" variant="h5">
                Users
            </Typography>
            <TextField
                sx={{ width: "20rem", m: "1rem" }}
                label="Search"
                variant="outlined"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
            />

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>
                            <Tooltip placement="top-start" style={{ cursor: "default" }} title="Words Per Minute">
                                <Box>ID</Box>
                            </Tooltip>
                        </TableCell>
                        <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>
                            <Tooltip placement="top-start" style={{ cursor: "default" }} title="Duration in seconds">
                                <Box>Email</Box>
                            </Tooltip>
                        </TableCell>
                        <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>
                            <Tooltip placement="top-start" style={{ cursor: "default" }} title="Words Per Minute">
                                <Box>Username</Box>
                            </Tooltip>
                        </TableCell>
                        <TableCell style={{ color: "white", fontSize: "17px", fontWeight: "bold" }}>
                            <Tooltip placement="top-start" style={{ cursor: "default" }} title="Words Per Minute">
                                <Box>Joined</Box>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userID &&
                        users &&
                        users.rows.map((row, idx) => (
                            <TableRow key={idx} sx={{ cursor: "pointer", "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell
                                    onClick={() => history.push(`/profile/${row.ID}`)}
                                    style={{ fontSize: "16px", color: "white" }}
                                    component="th"
                                    scope="row"
                                >
                                    {row.ID}
                                </TableCell>
                                <TableCell style={{ fontSize: "16px", color: "white" }} component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell style={{ fontSize: "16px", color: "white" }} component="th" scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell style={{ fontSize: "16px", color: "white" }} component="th" scope="row">
                                    {formatDate(row?.CreatedAt ?? "")}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {/* Footer pagination */}
            <Box style={{ marginTop: "auto", color: "white", marginRight: "1rem", marginBottom: "1rem" }}>
                <TablePagination
                    rowsPerPageOptions={[]}
                    classes={classes.ul}
                    component="div"
                    count={users?.total ?? 0} // replace with your actual count
                    page={pageNum} // replace with your current page
                    rowsPerPage={limit ?? 10} // replace with your actual rows per page
                    onPageChange={(event, newPage) => {
                        setPageNum(newPage)
                        setOffset(newPage * (limit ?? 10))
                    }}
                />
            </Box>
        </TableContainer>
    )
}
