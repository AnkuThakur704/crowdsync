import usermodel from '../db/users.js'

const getuserdata= async (email)=>{
    const userdata = await usermodel.findOne({email:email},{name:1, email:1})
    return userdata
}

export default getuserdata