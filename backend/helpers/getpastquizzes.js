import pastquizzesmodel from "../db/pastquizzes.js"


export const getpastquizzes = async(req, getfull)=>{
    try {
        let data
        if(getfull){
             data = await pastquizzesmodel.findOne({qid: req.query.qid, instance: req.query.instance})
             console.log("view past poll: ", data)
        }
        else { data = await pastquizzesmodel.find({author: req.query.author},{qid:1, qname:1, instance:1, updatedAt:1})}
        return data
    } catch (error) {
        console.log("pastpolls error: ",error)
        throw error     // meaning this function dont want to handle with this error , pass this to the one who is calling this function
    }
}