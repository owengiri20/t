let ENV = "DEV"

const TEST_URL = "https://api-typinggame.owengiri.dev/api"
export const BASE_API_URL = ENV === "PROD" ? "http://localhost:8080/api" : TEST_URL
