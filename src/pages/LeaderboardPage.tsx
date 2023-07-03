import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import React from "react"
import LeaderboardTable from "../components/leaderboard/LeaderboardTable"
import { Layout } from "./Layout"
import Box from "@mui/material/Box"
import { COLOURS } from "../game/CommonStyles"
import { makeStyles } from "@material-ui/core/styles"
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
                    <Tabs
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: COLOURS.lightBrown,
                            },
                        }}
                        sx={{
                            ".Mui-selected": {
                                color: "white !important",
                            },
                            ".MuiTab-wrapper": {
                                alignItems: "self-start",
                                justifyContent: "flex-start",
                            },
                        }}
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab sx={{ width: "20rem" }} label="Highest WPM" {...a11yProps(0)} />
                        <Tab sx={{ alignItems: "start", width: "20rem" }} label="Highest WPM Per User" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box sx={{ height: "85%" }}>
                        <LeaderboardTable key="wpm" limit={10} endpoint={"/leaderboard/highest-wpm"} title="Highest WPM" />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box sx={{ height: "85%" }}>
                        <LeaderboardTable key="wpm-per-user" limit={10} endpoint={"/leaderboard/highest-wpm-per-user"} title="Highest WPM (Per User)" />
                    </Box>
                </TabPanel>
            </>
        </Layout>
    )
}
