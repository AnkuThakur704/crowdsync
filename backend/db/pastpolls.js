import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const mongo_conn = process.env.MONGODB_CONN

await mongoose.connect(mongo_conn);

const pastpolls = new mongoose.Schema(
    {
    qid: String,
    instance: Number,
    type: String,
    qname: String,
    author: String,
    pages:[{id:Number,statement:String,
        options:[{text: String, votes:{type: Number, default: 0}}]
    }]
},{timestamps:true}
)

const pastpollsmodel = mongoose.model("pastpolls", pastpolls);

export default pastpollsmodel