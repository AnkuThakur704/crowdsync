import redisClient from "./redisInit.js";

export default async function connectRedis() {
    try {
        await redisClient.connect()
    } catch (error) {
        console.log("failed to connect Redis: ", error)
    }
}


