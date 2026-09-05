import express from 'express'
import validateToken from '../middleware/validateToken.js'
import getuserdata from '../helpers/getuserdata.js'
import savepage from '../helpers/savepage.js'
import questionmodel from '../db/questionnaires.js'
const generalRouter = express.Router()

generalRouter.post('/dashboard',validateToken,async (req, res)=>{
    console.log("hittt")
    
})

generalRouter.post('/verifyloggedin',validateToken, async (req,res)=>{
    console.log("verifed for nav",req.email)

    const userdata = await getuserdata(req.email)
    res.status(200).json({success:true, userdata: userdata})
})

generalRouter.post('/savepage',(req,res)=>{
    console.log("saving qu")
    savepage(req.body)
})

generalRouter.get('/drafts',validateToken,async(req,res)=>{
    console.log("fetching drafts for ", req.email)
    try {
        const alldrafts = await questionmodel.find({author:req.email})
        res.status(200).json({drafts: alldrafts})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }

})

generalRouter.post("/getqtype",async(req,res)=>{
    const data = await questionmodel.findOne({qid:req.body.qid},{type:1})
    res.send(data.type)
})

generalRouter.post('/getdraftdata',async(req,res)=>{
    const draftdata = await questionmodel.findOne({qid: req.body.qid})
    res.status(200).json(draftdata)
})

generalRouter.post('/getqmetadata', async(req, res)=>{
    const data = await questionmodel.findOne({qid: req.body.qid}, {type:1, qname:1, author:1, isLive:1})
    console.log("METADATA: ", req.body.qid)
    res.status(200).json(data)
})

generalRouter.post('/marklive', async(req,res)=>{
    await questionmodel.updateOne({qid: req.body.qid}, {$set:{isLive:true}})
    res.status(200).json({success:true})
})

generalRouter.post('/endlive', async(req, res)=>{
    await questionmodel.updateOne({qid: req.body.qid}, {$set:{isLive:false}})
    res.status(200).json({success:true})
})

generalRouter.post('/checkqidandlivestatus',async(req, res)=>{
    const data = await questionmodel.findOne({qid: req.body.qid})
    if(data){
        if(data.isLive){
            res.status(200).json({success: true, type: data.type})
    }
    else res.status(404).json({success:false})
    }
    else res.status(404).json({success:false})

})

export default generalRouter
