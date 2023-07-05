export const wordsJSON = require("./words.json")

export interface Word {
    word: string
    status: "correct" | "incorrect" | "eh"
    cut: boolean
}

// creates an array of every "nth" number
export const everyNth = (arr: number[], nth: number) => arr.filter((_, i) => i % nth === nth - 1)

export const shuffle = (arr: string[]) => {
    let currentIndex = arr.length,
        temporaryValue,
        randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = arr[currentIndex]
        arr[currentIndex] = arr[randomIndex]
        arr[randomIndex] = temporaryValue
    }

    return arr
}

export const genWords = (): Word[] => {
    const words: string[] = shuffle([...wordsJSON.split("|"), ...wordsJSON.split("|"), ...wordsJSON.split("|")])
    const cutOffs = everyNth(Array.from(Array(words.length).keys()), 5)
    let testWords: Word[] = words.map((w, i) => {
        let c = false
        if (cutOffs.includes(i)) {
            c = true
        }
        return { word: w, status: "eh", cut: c }
    })

    // Cap the length to 350
    testWords = testWords.slice(0, 350)

    return testWords
}
