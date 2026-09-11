import questionmodel from "../db/questionnaires.js"
import redisClient from "../redis/redisInit.js"
import pastpollsmodel from "../db/pastpolls.js"
import pastquizzesmodel from "../db/pastquizzes.js"


const socketinitfunc = (io) => {
    const hostsmap = new Map()
    const votedmap = new Map()
    const scoremap = new Map()
    const timermap = new Map()
    const getusercount = (qid) => {
        const room = io.sockets.adapter.rooms.get(qid)
        // console.log("room", room)
        return room ? room.size : 0
    }

    io.on("connection", (socket) => {

        socket.on("hostjoin", async (obj) => {
            const typedata = await questionmodel.findOne({ qid: obj.qid }, { type: 1 })
            socket.join(obj.qid)
            console.log("Host joined", typedata, obj.qid);
            hostsmap.set(obj.qid, socket.id)
            votedmap.set(obj.qid, [])
            if (typedata.type === "quiz") {
                console.log("host join: its a quiz")
                scoremap.set(obj.qid, new Map())
                timermap.set(obj.qid, true)
            }
        })
        //join room
        socket.on("joinroom", (obj) => {
            socket.join(obj.qid)
            socket.qid = obj.qid
            console.log(socket.id, " joined the room with id: ", obj.qid)
            if (obj.type === "quiz") {
                scoremap.get(obj.qid).set(obj.username, 0)
            }
            const count = getusercount(obj.qid)
            io.to(obj.qid).emit("updateparticipantscount", count != 0 ? count - 1 : 0)
            const hostid = hostsmap.get(obj.qid)
            io.to(hostid).emit("participantname", obj.username)
        })

        socket.on("leaveroom", (obj) => {
            const hostid = hostsmap.get(obj.qid)
            io.to(hostid).emit("leftname", obj.username)
        })

        socket.on("disconnect", () => {
            const qid = socket.qid
            const count = getusercount(qid)
            io.to(qid).emit("updateparticipantscount", count != 0 ? count - 1 : 0)
        })

        socket.on("endpoll", async (qid) => {
            io.to(qid).emit("pollended")
            hostsmap.delete(qid)
            votedmap.delete(qid)
            // let polldata = await redisClient.get(`${qid}`)
            // polldata = JSON.parse(polldata)
            // polldata.isLive = false
            // polldata.currentquestion = -1
            // await questionmodel.replaceOne({qid : qid},polldata);
            // this was for updating the votes in the questionnaire db, but I will make a separate db for the polls/ quizzes that have already happened, so that the host can host the same poll multiple times
            await questionmodel.updateOne({ qid: qid }, { $set: { isLive: false } });
            let polldata = await redisClient.get(`${qid}`)
            polldata = JSON.parse(polldata)
            if (polldata.type == "poll") {
                const instances = await pastpollsmodel.find({ qid: qid })
                let instance = instances.length + 1;
                polldata.instance = instance;
                delete polldata._id
                await pastpollsmodel.insertOne(polldata);
            }
            else {
                const instances = await pastquizzesmodel.find({ qid: qid })
                let instance = instances.length + 1;
                const scores = scoremap.get(qid)
                const temp = [...scores].sort((a, b) => b[1] - a[1])
                const leaderboard = temp.map((item, idx) => { return { username: item[0], score: item[1] } })
                await pastquizzesmodel.insertOne({qid: qid,instance: instance, qname: polldata.qname, author: polldata.author, leaderboard: leaderboard})
            }
            if (scoremap.get(qid)) scoremap.delete(qid)
            await redisClient.del(`${qid}`);
        })

        socket.on("givequestion", async (qid) => {
            // const start = performance.now();   /////////
            const hostid = hostsmap.get(qid)
            let ques = {}  // this is where I fetch questions

            const cachepoll = await redisClient.get(`${qid}`)
            if (!cachepoll) {
                ques = await questionmodel.findOne({ qid: qid })
                if (!ques) return;
                await redisClient.set(`${qid}`, JSON.stringify(ques), {
                    exp: 60 * 10
                })
            }
            else ques = JSON.parse(cachepoll)

            // const afterFind = performance.now();  /////////
            if (!ques) return;
            const size = ques.pages.length
            const idx = ques.currentquestion + 1
            if (idx === size) {
                io.to(hostid).emit("queshasended")
                return
            }
            ques.currentquestion = idx;
            await redisClient.set(`${qid}`, JSON.stringify(ques))
            // await questionmodel.updateOne({ qid: qid }, { $set: { currentquestion: idx } })  // i update the index currently fetch question
            // const afterUpdate = performance.now();   /////////
            const question = ques.pages[idx]
            delete question.correct
            votedmap.get(qid).push(new Set())
            io.to(qid).emit("questionchanged", { question: question, idx: idx })
            if (ques.type === "quiz") {
                let time = ques.pages[idx].time
                timermap.set(qid, false)
                const timer = setInterval(() => {
                    io.to(qid).emit("timechanged", time)
                    time--;
                    if (time < 0) {
                        io.to(qid).emit("timesup")
                        timermap.set(qid, true)
                        clearInterval(timer)
                    }
                }, 1000);
            }

            // const end = performance.now();
            // console.log(
            //     `Q${idx} | findOne: ${(afterFind - start).toFixed(2)}ms | updateOne: ${(afterUpdate - afterFind).toFixed(2)}ms | total: ${(end - start).toFixed(2)}ms`
            // );
        })

        socket.on("incvotecount", async (reqbd) => {
            let cachepoll = await redisClient.get(`${reqbd.qid}`)
            cachepoll = JSON.parse(cachepoll)

            if (votedmap.get(reqbd.qid) != null && votedmap.get(reqbd.qid)[reqbd.idx].has(socket.id)) return
            votedmap.get(reqbd.qid)[reqbd.idx].add(socket.id)
            // await questionmodel.updateOne({ qid: reqbd.qid }, { $inc: { [`pages.${reqbd.idx}.options.${reqbd.votedoption}.votes`]: 1 } })
            cachepoll.pages[reqbd.idx].options[reqbd.votedoption].votes++;

            // const data = await questionmodel.aggregate([{ $match: { qid: reqbd.qid } },
            // { $project: { question: { $arrayElemAt: ["$pages", reqbd.idx] } } }
            // ])
            io.to(hostsmap.get(reqbd.qid)).emit("someonevoted", { question: cachepoll.pages[reqbd.idx] })
            await redisClient.set(`${reqbd.qid}`,
                JSON.stringify(cachepoll)
            )
            console.log("inc vote count for", reqbd.idx)
            console.log("voted option: ", reqbd.votedoption)
            console.log(cachepoll.pages[reqbd.idx])
        })

        socket.on("giveusercount", (qid) => {
            const count = getusercount(qid)
            io.to(hostsmap.get(qid)).emit("takeusercount", count === 0 ? 0 : count - 1)
        })

        socket.on("checkans", async (reqbd) => {
            if (timermap.get(reqbd.qid)) return  // if its true => time's up
            const option = reqbd.option
            const username = reqbd.username
            const qid = reqbd.qid
            let quizdata = await redisClient.get(`${qid}`)
            quizdata = JSON.parse(quizdata)
            const idx = quizdata.currentquestion
            const correctans = quizdata.pages[idx].correct
            // const idx = await questionmodel.findOne({ qid: qid }, { currentquestion: 1 })
            // const qdata = await questionmodel.aggregate([{ $match: { qid: qid } }, { $project: { question: { $arrayElemAt: ["$pages", idx.currentquestion] } } }])
            //qdata.question.correct
            // console.log("q data: ", qdata)
            if (correctans === option) {
                const prevscore = scoremap.get(qid).get(username)
                scoremap.get(qid).set(username, prevscore + 10)
            }
            //qdata[0].question.correct
        })

        socket.on("giveleaderboard", (qid) => {
            const scores = scoremap.get(qid)
            const temp = [...scores].sort((a, b) => b[1] - a[1])
            const leaderboard = temp.map((item, idx) => { return { username: item[0], score: item[1] } })
            io.to(hostsmap.get(qid)).emit("takeleaderboard", leaderboard)
        })
    })
}

export default socketinitfunc