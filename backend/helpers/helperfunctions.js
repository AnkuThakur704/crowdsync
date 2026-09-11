import questionmodel from "../db/questionnaires.js"
import pastpollsmodel from "../db/pastpolls.js"
import pastquizzesmodel from "../db/pastquizzes.js"

export const getstats = async(email)=>{
    let totalques = await questionmodel.countDocuments({author: email})
    let pastpolls = await pastpollsmodel.countDocuments({author: email})
    let pastquizzes = await pastquizzesmodel.countDocuments({author: email})
    return {totalques: totalques, hosted: pastpolls+pastquizzes}
}