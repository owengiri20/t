import React from "react"
import { styled } from "@mui/system"
import Button from "@mui/material/Button"
import { COLOURS } from "../game/CommonStyles"
import { SxProps, Theme } from "@mui/material"

const StyledButton = styled(Button)(({ theme }) => ({
    color: COLOURS.lightBrown,
    backgroundColor: COLOURS.darkBrown,
    borderRadius: "15px",
    padding: "5px",
}))
interface MyStyledButtonProps extends Omit<React.ComponentProps<typeof Button>, "children"> {
    children: React.ReactNode
    sx?: SxProps<Theme>
}

export default function MyStyledButton({ children, sx, ...props }: MyStyledButtonProps) {
    return (
        <StyledButton {...props} sx={(sx as any) ?? {}}>
            {children}
        </StyledButton>
    )
}
