import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { SnackbarProvider } from "notistack"
const queryClient = new QueryClient()

const appThme = createTheme({
    palette: {
        mode: "dark",
    },

    typography: {
        allVariants: {
            color: "#fff",
        },
    },
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={appThme}>
            <SnackbarProvider />
            <CssBaseline />

            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
)
