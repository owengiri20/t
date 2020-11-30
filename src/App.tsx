import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import React from "react"
import { Route, Switch } from "react-router-dom"
import "./App.css"
import { AppWrapper } from "./common/appWrapper"
import { TyperWrapper as Typer } from "./game/typer"
import { ModesContainer } from "./state/modes"
import { WordsContainer } from "./state/words"

const theme = createMuiTheme({
	palette: {},
})

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<WordsContainer.Provider>
				<ModesContainer.Provider>
					<AppWrapper>
						<Container maxWidth={"lg"} style={{ marginTop: "20px" }}>
							<Switch>
								<Route path="/" component={Typer} exact />
							</Switch>
						</Container>
					</AppWrapper>
				</ModesContainer.Provider>
			</WordsContainer.Provider>
		</ThemeProvider>
	)
}

export default App
