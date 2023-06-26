let ENV = "PROD"

const TEST_URL = "https://api-typinggame.owengiri.dev/api"
// const TEST_URL = "https://urchin-app-8kf9c.ondigitalocean.app/api"

export const BASE_API_URL = ENV === "DEV" ? "http://localhost:8080/api" : TEST_URL

console.log(process.env.BASE_API_URL)
