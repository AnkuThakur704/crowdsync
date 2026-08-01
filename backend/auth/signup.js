import usermodel from "../db/users.js"
import bcrypt from 'bcrypt'
//hash the password
//encrypt the password - jwt

const signup = async(name,email,password)=>{

    const saltRounds = 10
    try {
        const exists = await usermodel.findOne({email:email})
        if(!exists){  //exists==null, means new user, so register
            const hash = await  bcrypt.hash(password, saltRounds)
        const insrtdata = await usermodel.insertOne({name: name, email: email, password: hash})
        if(!insrtdata) return false
        else return true
        }
        else{  //user already exists
            return false
        }
    } catch (error) {
        return false
    }

}

export default signup