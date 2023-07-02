import React from "react"
import AdminUsersTable from "../components/admin/UserTable"
import { Layout } from "./Layout"
import LeaderboardTable from "../components/leaderboard/LeaderboardTable"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"

import Box from "@mui/material/Box"
import LeaderboardTablePerUser from "../components/leaderboard/LeaderboardTablePerUser"
import LeaderboardTableHighestWPM from "../components/leaderboard/LeaderboardTable"
interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            style={{ height: "100%" }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ height: "100%", p: 3 }}>{children}</Box>}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

export const LeaderboardPage = () => {
    const [value, setValue] = React.useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Layout>
            <>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Highest WPM" {...a11yProps(0)} />
                        <Tab label="Highest WPM Per User" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box sx={{ height: "85%" }}>
                        <LeaderboardTableHighestWPM limit={10} />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box>
                        <LeaderboardTablePerUser limit={10} />
                    </Box>
                </TabPanel>
            </>
        </Layout>
    )
}
