import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const mongo_conn = process.env.MONGODB_CONN
await mongoose.connect(mongo_conn)
const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String 
    //How to establiish relation? Ans: the polls and quizes will have the host's id.
},{timestamps: true})

const usermodel = mongoose.model("usermodel",UserSchema)

export default usermodel
