import { atom, useAtom } from "jotai"

export interface GameState {
    status: "finished" | "idle" | "playing"
}

const gameStateAtom = atom<GameState>({
    status: "idle",
})

export const useGame = () => {
    const [gameState, setGameState] = useAtom(gameStateAtom)

    const hideSettings = gameState.status !== "idle"

    return {
        gameState,
        setGameState,
        hideSettings,
    }
}
