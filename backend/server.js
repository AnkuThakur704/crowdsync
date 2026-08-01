import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authrouter from './auth/auth.js'
import generalRouter from './routes/routes.js'
import http from "http"
import {Server} from "socket.io"
import socketinitfunc from './socket/init.js'

dotenv.config()

const app = express()
const httpserver = http.createServer(app)
const io = new Server(httpserver,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

app.use(cors({
    origin: ["*","http://localhost:5173"],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
const port = process.env.PORT 

app.get('/',(req,res)=>{
    res.send("This is the server for CrowdSync")
})

app.use("/auth",authrouter)
app.use('/routes',generalRouter)

socketinitfunc(io)


httpserver.listen(port,()=>{
    console.log(`Server running at: http://localhost:8080`)
})