import { Box } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },

        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: "none",
        },
    }),
)

interface AppWrapperProps {
    children: JSX.Element
}
export const AppWrapper = (props: AppWrapperProps) => {
    const classes = useStyles()
    return <Box className={classes.root}>{props.children}</Box>
}
