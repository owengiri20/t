import { atom, useAtom } from "jotai"
import { useEffect } from "react"

const lineHeightAtom = atom<number>(62)

export const useLineHeight = () => {
    const [lineHeight, setLineHeight] = useAtom(lineHeightAtom)

    window.addEventListener("resize", () => {
        let winHeight = window.innerHeight
        if (winHeight <= 560) {
            setLineHeight(30)
            return
        }
        if (winHeight <= 660) {
            setLineHeight(35)
            return
        }
        if (winHeight <= 850) {
            setLineHeight(40)
            return
        }
        if (winHeight <= 1000) {
            setLineHeight(50)
            return
        }
        if (winHeight >= 1100) {
            setLineHeight(62)
        }
    })

    useEffect(() => {
        let winHeight = window.innerHeight
        if (winHeight <= 850) {
            setLineHeight(40)
            return
        }
        if (winHeight <= 1000) {
            setLineHeight(50)
            return
        }
    }, [])

    return {
        lineHeight,
    }
}
