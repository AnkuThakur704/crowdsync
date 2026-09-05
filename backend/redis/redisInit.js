import { createClient } from "redis";

const redisClient = createClient({
    url: "redis://127.0.0.1:6379"
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