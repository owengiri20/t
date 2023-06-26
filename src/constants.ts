const ENV = process.env.ENV ?? "DEV"
export const BASE_API_URL = ENV === "DEV" ? "http://localhost:8080/api" : process.env.BASE_API_URL

console.log(process.env.BASE_API_URL)
