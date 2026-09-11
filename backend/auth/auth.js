import express from 'express'
import signup from './signup.js'
import login from './login.js'

const authrouter = express.Router()

authrouter.post("/signup", async (req, res) => {
    const flag = await signup(req.body.name, req.body.email, req.body.password)
    res.json({ success: flag })
})

authrouter.post("/login", async (req, res) => {
    const data = await login(req)
    console.log("status: ", data)
    if (data.status) {
        console.log("cookie sent")
        res.cookie("sessionToken", data.token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }
        )
    }
    res.json({ success: data.status })
})

authrouter.post("/logout", (req, res) => {
    res.clearCookie("sessionToken")
    res.status(200).json({ message: "logged out successfully" })
})

export default authrouter