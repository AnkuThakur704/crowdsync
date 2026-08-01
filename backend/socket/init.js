import questionmodel from "../db/questionnaires.js"

const socketinitfunc = (io)=>{
    const hostsmap = new Map()
    const votedmap = new Map()
    const scoremap = new Map()
    const timermap = new Map()
    const getusercount = (qid)=>{
        const room = io.sockets.adapter.rooms.get(qid)
        console.log("room", room)
        return room?room.size:0
    }

    io.on("connection",(socket)=>{

        socket.on("hostjoin",async(obj)=>{
            const typedata = await questionmodel.findOne({qid: obj.qid},{type:1})
            socket.join(obj.qid)
            console.log("Host joined", typedata,obj.qid);
            hostsmap.set(obj.qid, socket.id)
            votedmap.set(obj.qid, [])
            if(typedata.type==="quiz"){
                console.log("host join: its a quiz")
                scoremap.set(obj.qid, new Map())
                timermap.set(obj.qid, true)
            }
        })
        //join room
        socket.on("joinroom",(obj)=>{
            socket.join(obj.qid)
            socket.qid = obj.qid
            console.log(socket.id," joined the room with id: ", obj.qid)
            if(obj.type==="quiz"){
                scoremap.get(obj.qid).set(obj.username, 0)
            }
            const count = getusercount(obj.qid)
            io.to(obj.qid).emit("updateparticipantscount",count!=0?count-1:0)
            const hostid = hostsmap.get(obj.qid)
            io.to(hostid).emit("participantname", obj.username)
        })
        
        socket.on("leaveroom",(obj)=>{
            const hostid = hostsmap.get(obj.qid)
            io.to(hostid).emit("leftname", obj.username)
        })

        socket.on("disconnect",()=>{
            const qid = socket.qid
            const count =getusercount(qid)
            io.to(qid).emit("updateparticipantscount",count!=0?count-1:0)
        })

        socket.on("endpoll", (qid)=>{
            io.to(qid).emit("pollended")
            hostsmap.delete(qid)
            votedmap.delete(qid)
            if(scoremap.get(qid)) scoremap.delete(qid)
        })

        socket.on("givequestion",async (qid)=>{
            console.log("host asked for first question")
            const hostid = hostsmap.get(qid)
            const ques = await questionmodel.findOne({qid:qid})
            if(!ques) return;
            const size = ques.pages.length 
            const idx = ques.currentquestion +1
            if(idx===size){
                io.to(hostid).emit("queshasended")
                return
            }
            await questionmodel.updateOne({qid:qid}, {$set:{currentquestion: idx}})
            const question = ques.pages[idx].toObject()
            delete question.correct
            console.log("this is 1st q:", question)
            votedmap.get(qid).push(new Set())
            io.to(qid).emit("questionchanged",{question:question, idx: idx})
            if(ques.type==="quiz"){
                let time = ques.pages[idx].time
                timermap.set(qid, false)
                const timer = setInterval(() => {
                    io.to(qid).emit("timechanged", time)
                    time--;
                    if(time<0){
                        io.to(qid).emit("timesup")
                        timermap.set(qid, true)
                        clearInterval(timer)
                    }
                }, 1000);
            }
        })

        socket.on("incvotecount",async(reqbd)=>{
            console.log("from inc: reqbd:", reqbd)
            console.log("from inc: map data: ", votedmap.get(reqbd.qid))
            if(votedmap.get(reqbd.qid)!=null&&votedmap.get(reqbd.qid)[reqbd.idx].has(socket.id)) return
            votedmap.get(reqbd.qid)[reqbd.idx].add(socket.id)
            await questionmodel.updateOne({qid: reqbd.qid}, {$inc:{[`pages.${reqbd.idx}.options.${reqbd.votedoption}.votes`]:1}})
            const data = await questionmodel.aggregate([{$match: {qid: reqbd.qid}}, 
                {$project: {question: {$arrayElemAt: ["$pages", reqbd.idx]}}}
            ])
            io.to(hostsmap.get(reqbd.qid)).emit("someonevoted",data)
        })

        socket.on("giveusercount", (qid)=>{
            const count = getusercount(qid)
            io.to(hostsmap.get(qid)).emit("takeusercount", count===0?0:count-1)
        })

        socket.on("checkans",async(reqbd)=>{
            if(timermap.get(reqbd.qid)) return
            const option = reqbd.option
            const username = reqbd.username
            const qid = reqbd.qid
            const idx = await questionmodel.findOne({qid : qid}, {currentquestion:1})
            const qdata = await questionmodel.aggregate([{$match:{qid:qid}}, {$project:{question:{$arrayElemAt:["$pages", idx.currentquestion]}}}])
            //qdata.question.correct
            console.log("q data: ", qdata)
            if(qdata[0].question.correct===option){
                const prevscore = scoremap.get(qid).get(username)
                scoremap.get(qid).set(username, prevscore+10)
            }
        })

        socket.on("giveleaderboard", (qid)=>{
            const scores = scoremap.get(qid)
            const temp = [...scores].sort((a,b)=> b[1]- a[1])
            const leaderboard =  temp.map((item, idx)=>{ return{username: item[0], score:item[1] }})
            io.to(hostsmap.get(qid)).emit("takeleaderboard", leaderboard)
        })
    })
}

export default socketinitfunc