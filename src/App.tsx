import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import React from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"
import { AppWrapper } from "./common/appWrapper"
import { Game  } from "./game"

const theme = createMuiTheme({
	palette: {},
})
function App() {
	return (
		<ThemeProvider theme={theme}>
			<AppWrapper>
				<Container maxWidth={"xl"} style={{ marginTop: "20px" }}>
					<Switch>
						<Route path="/" component={Game} exact />
					</Switch>
				</Container>
			</AppWrapper>
		</ThemeProvider>
	)
}

export default App
