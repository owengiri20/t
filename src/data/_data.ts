import naruto from "./json/naruto.json"
import words from "./json/words.json"

// move to types file
export interface TestWord {
	word: string
	status: "correct" | "incorrect" | "eh"
	cut: boolean
}

export const data: any = {
	naruto,
	words,
}

// todo move to helpers/utils
export const varToString = (varObj: any) => Object.keys(varObj)[0]

// creates an array of every "nth" number
export const everyNth = (arr: number[], nth: number) => arr.filter((_, i) => i % nth === nth - 1)

// shuffle/randomizes string array
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

// generate list of words of json file
export const genWords = (key: string): TestWord[] | null => {
	const pickedTest = data[key]
	if (!pickedTest) {
		console.log("wtf man")
		console.log("wtf man")
		console.log("wtf man")
		console.log("wtf man")
		return null
	}
	const words: string[] = shuffle([...pickedTest.split("|"), ...pickedTest.split("|")])

	const cutOffs = everyNth(Array.from(Array(words.length).keys()), 5)
	const testWords: TestWord[] = words.map((w, i) => {
		let c = false
		if (cutOffs.includes(i)) {
			c = true
		}
		return { word: w, status: "eh", cut: c }
	})

	return testWords
}
