import * as process from "process";

console.log ("env", process.env.BASE_API_URL)

export const BASE_API_URL = process.env.NODE_ENV === 'production' ? "https://api.aniverse.website" : 'http://localhost:3301';