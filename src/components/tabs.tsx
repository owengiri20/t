import { Container, Paper, Typography } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import React from "react"
import { genWords } from "../data/_data"
import { ModesContainer } from "../state/modes"
import { WordsContainer } from "../state/words"

interface TabPanelProps {
	children?: React.ReactNode
	index: any
	value: any
}

export const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props

	return (
		<div id="motherfucker" style={{ height: "80%", width: "100%" }} role="tabpanel" hidden={value !== index} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && (
				<Box height="100%" p={3}>
					{children}
				</Box>
			)}
		</div>
	)
}

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	}
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	modalContainer: {
		// height: "100%",
		display: "flex",
	},

	modalBodyInner: {
		width: "100%",
		height: "90%",
		display: "flex",
		margin: "15px",
	},
	modeCard: {
		height: "40%",
		width: "30%",
		margin: "10px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	panel: {
		// height: "100%",
	},
}))

export const SimpleTabs = () => {
	const classes = useStyles()
	const [value, setValue] = React.useState(0)

	// Words Container
	const { words, setWords } = WordsContainer.useContainer()
	const { modesModalOpen, setModesModalOpen, setMode } = ModesContainer.useContainer()

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue)
	}

	return (
		<div id="aaaaaaaaa" className={classes.root}>
			<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
				<Tab label="Easy" {...a11yProps(0)} />
				<Tab label="Medium" {...a11yProps(1)} />
				<Tab label="Hard" {...a11yProps(2)} />
				<Tab label="Other" {...a11yProps(3)} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<Container className={classes.modalBodyInner}>
					<Paper
						onClick={() => {
							setWords(genWords("words"))
							setModesModalOpen(false)
							setMode("Easy")
						}}
						className={classes.modeCard}
					>
						Easy Random
					</Paper>
				</Container>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Container className={classes.modalBodyInner}>
					<Paper className={classes.modeCard}>Medium Random</Paper>
				</Container>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Container className={classes.modalBodyInner}>
					<Paper className={classes.modeCard}>Hard Random</Paper>
				</Container>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<Container className={classes.modalBodyInner}>
					<Typography variant={"h5"}>Comming soon</Typography>
				</Container>
			</TabPanel>
		</div>
	)
}
