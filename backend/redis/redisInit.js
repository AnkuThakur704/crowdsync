import { createClient } from "redis";
import dotenv from "dotenv"
dotenv.config()

const redis_conn = process.env.REDIS_CONN

const redisClient = createClient({
    url: redis_conn
});

redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
});
// the above hanlder keeps retrying for reconnection if failed, but my app keeps working.

redisClient.on("connect", () => {
    console.log("Redis connected")
})


export default redisClient;

//redis://172.28.214.240