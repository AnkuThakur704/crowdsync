import jwt from 'jsonwebtoken'

const jwt_secret = process.env.JWT_SECRET
const validateToken = (req,res,next)=>{
    try {
        const status  = jwt.verify(req.cookies.sessionToken, jwt_secret)
    console.log("jwt status:", status)
    req.email = status.data
     next()
    } catch (error) {
        return res.status(401).json({success:false, msg:"Invalid token"})
    }

}


export default validateToken