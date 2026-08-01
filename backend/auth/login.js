import usermodel from "../db/users.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (req) => {
    const secret_key = process.env.JWT_SECRET
    console.log("login router: ", req.body)
    let res = {}
    try {
        const exists = await usermodel.findOne({ email: req.body.email })
        if (!exists) {
            return {status:false};
        }
        const hash = exists.password

        const result  = await bcrypt.compare(req.body.password, hash)
        if (result) {
                //send jwt and redirect(return true)
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                    data: req.body.email
                }, secret_key);
                console.log("jwt: ", token)
                res = {status: true, token: token}
            }                   
            else {
                res = {status: false}
            }
       
        return res

    } catch (error) {
        console.log("login err:", error)
        return {status:false}
    }

}

export default login