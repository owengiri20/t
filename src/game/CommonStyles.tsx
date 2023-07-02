import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles({
    indicator: { height: "60px", width: "60px" },
    typingArea: {
        margin: "20px 0",
        paddingBottom: "15px",
        padding: "10px",
        maxHeight: "250px",
        overflowY: "auto",
        fontSize: "20px",
        textAlign: "center",
        pointerEvents: "none",
        userSelect: "none",
    },
    textAreaStyles: {
        width: "100%",
        fontSize: "30px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "transparent",
        border: "0 !important",
        outline: "none",
        resize: "none",
        color: "#AA8270",
    },
    line: {
        height: "2px",
        width: "100%",
        backgroundColor: "black",
        marginBottom: "20px",
    },
    timer: {
        display: "flex",
        justifyContent: "center",
    },
    timerText: {
        fontSize: "80px",
        opacity: ".4",
        color: "#AA8270",
    },
    finishCard: {
        maxWidth: "500px",
        margin: "auto",
    },
    StarRatingBox: {
        textAlign: "center",
    },
    CenterBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
})

export const COLOURS = {
    lightBrown: "#AA8270",
    notSoLightBrown: "#1f130a",
    darkishBrown: "#21190f",
    darkBrown: "#0A0603",

    fadedRed: "#9c3d3d",
    fadedGreen: "#456b3d",

    podium: "#19212b",
}
