import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const mongo_conn = process.env.MONGODB_CONN

await mongoose.connect(mongo_conn);

const pastquizzes = new mongoose.Schema(
    {
    qid: String,
    instance: Number,
    qname: String,
    author: String,
    leaderboard:[{username:String, score: Number}]
},{timestamps:true}
)

const pastquizzesmodel = mongoose.model("pastquizzes", pastquizzes);

export default pastquizzesmodel