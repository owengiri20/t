export const calculateWPM = (correctCharacters: number, timeInSeconds: number, correctWordsCount: number): number => {
    const totalWords = (correctCharacters + correctWordsCount) / 5 // Convert characters to words
    const timeInMinutes = timeInSeconds / 60 // Convert time to minutes
    const wpm = totalWords / timeInMinutes // Calculate words per minute

    return Number(wpm.toFixed(1))
}

export const calculateCharAccuracy = (correctChars: number, totalChars: number, correctWordsCount: number): number => {
    const accuracy = ((correctChars + correctWordsCount) / totalChars) * 100 // Calculate character accuracy as a percentage

    if (isNaN(accuracy)) return 0

    return Number(accuracy.toFixed(1))
}
