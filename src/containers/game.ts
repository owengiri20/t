import { atom, useAtom } from "jotai"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export interface GameState {
    status: "finished" | "idle" | "playing"
}

const gameStateAtom = atom<GameState>({
    status: "idle",
})

export const useGame = () => {
    const [gameState, setGameState] = useAtom(gameStateAtom)

    const hideSettings = gameState.status !== "idle"

    const location = useLocation()

    useEffect(() => {
        setGameState((prevState) => ({ ...prevState, status: "idle" }))
    }, [location, setGameState])

    return {
        gameState,
        setGameState,
        hideSettings,
    }
}
