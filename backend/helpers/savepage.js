import questionmodel from '../db/questionnaires.js'

const savepage = async (body) => {
   try {
      const checkexistence = await questionmodel.findOne({ qid: body.qid })
      if (checkexistence === null) {  //means new questionnaire
         await questionmodel.insertOne({ qid: body.qid, type: body.type, qname: body.qname, author: body.author, pages: body.pages, isLive: false })
      }
      else {
         await questionmodel.updateOne({ qid: body.qid }, { $set: { pages: body.pages } })
      }
   } catch (error) {
      throw error
   }
}

export default savepage