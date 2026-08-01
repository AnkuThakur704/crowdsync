import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const mongourl = process.env.MONGODB_CONN
mongoose.connect(mongourl)

const questionnare = mongoose.Schema({
    qid: String,
    type: String,
    qname: String,
    author: String,
    currentquestion: {type: Number, default: -1},
    pages:[{id:Number,statement:String,time:Number,correct:Number,
        options:[{text: String, votes:{type: Number, default: 0}}]
    }],
    isLive: Boolean
},{timestamps:true})

const questionmodel = mongoose.model("questionnaires",questionnare)
export default questionmodel
