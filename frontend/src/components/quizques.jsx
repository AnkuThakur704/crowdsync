import socket from "../socket/socket"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from '../../helpers/Authcontext'
import Participantlobby from "./smallcompo/participantlobby"
const backend_url = import.meta.env.VITE_BACKEND_URL

const quizques = () => {

    const navigate = useNavigate()
    const { userdata } = useAuth()
    const [qdata, setqdata] = useState({
        type: "",
        author: "",
        qname: ""
    })
    const [count, setcount] = useState(0)
    const [currquesidx, setcurrquesidx] = useState(0)
    const [currques, setcurrques] = useState()
    const [islive, setislive] = useState(false)
    const [votedoption, setvotedoption] = useState(-1)
    const [voted, setvoted] = useState(false)
    const [time, settime] = useState(-1)
    const [timesup, settimesup] = useState(false)
    const getqdata = async (qid) => {
        const r = await fetch(`${backend_url}/routes/getqmetadata`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                qid: qid
            })
        })
        const data = await r.json()
        if (r.status == 200) {
            setqdata(data)
            console.log("slice: ", data)
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const params_id = params.get("id")
        socket.connect()
        socket.emit("joinroom", { qid: params_id, username: userdata.email.split('@')[0] ,type:"quiz" })
        getqdata(params_id)
    }, [])
    useEffect(() => {
        socket.on("updateparticipantscount", (count) => {
            setcount(count)
        })
        return () => {
            socket.off("updateparticipantscount")
        }
    }, [])

    useEffect(() => {
        socket.on("pollended", () => {
            socket.disconnect()
            navigate('/dashboard')
        })
    }, [])

    useEffect(() => {
        socket.on("questionchanged", (res) => {
            setcurrquesidx(res.idx)
            setcurrques(res.question)
            setislive(true)
            setvoted(false)
            settimesup(false)
            console.log("question: ", res.question)
        })

        return () => {
            socket.off("questionchanged")
        }
    }, [])

    useEffect(() => {
        socket.on("timechanged", (time) => {
            settime(time)
        })

        return () => {
            socket.off("timechanged")
        }
    }, [])

    useEffect(() => {
      socket.on("timesup",()=>{
        settimesup(true)
      })
    
      return () => {
        socket.off("timesup")
      }
    }, [])
    



    const leaveroom = () => {
        const params = new URLSearchParams(window.location.search)
        const params_id = params.get("id")
        console.log("Leave called")
        socket.emit("leaveroom", { qid: params_id, username: userdata.email.split('@')[0] })
        socket.disconnect()
        console.log("is socket connected? ", socket.connected)
        navigate('/dashboard')

    }
    const incvotecount = (idx) => {
        setvotedoption(idx)
    }
    const submitvote = () => {
        if(timesup||voted) return
        const params = new URLSearchParams(window.location.search)
        const params_id = params.get("id")
        if (votedoption === -1) return
        console.log("option submitted: ", votedoption)
        socket.emit("checkans",{qid: params_id,option:votedoption, username: userdata.email.split('@')[0]})
        setvoted(true)
    }

    return (
        <div className="min-h-screen w-full bg-[#1a1a1a] text-white flex flex-col  items-center justify-center px-4 pt-20 ">
            {islive ?
                <div className="w-full max-w-3xl mx-auto">
                    <div className="border border-white bg-[#2a2a2a] p-8 relative">

                        <div className="text-gray-400 text-sm tracking-wide uppercase mb-6">Time left: <span className={`${time>5?"text-green-400":"text-red-400"} font-bold`}>{time}</span></div>
                        {voted&&<p className="text-green-400 absolute right-2 top-4">Your reponse has been recorded</p>}
                        {/* Question */}
                        <div className="flex items-start gap-4 mb-8">
                            <div className="flex items-center justify-center w-9 h-9 shrink-0 border border-white font-bold">
                                {currquesidx + 1}
                            </div>

                            <p className="text-2xl font-semibold text-white leading-relaxed">
                                {currques.statement}
                            </p>
                        </div>

                        {/* Options */}
                        <div className="space-y-3 mb-8">
                            {currques.options.map((item, key) => (
                                <button onClick={() => incvotecount(key)}
                                    key={key}
                                    className={`w-full flex items-center gap-4 border ${(votedoption!=-1&&votedoption==key)?"border-sky-500":"border-zinc-500"} bg-zinc-800 px-5 py-4 transition duration-300  hover:bg-zinc-700 hover:border-white cursor-pointer`}
                                >
                                    <div className="flex items-center justify-center w-8 h-8 shrink-0 border border-zinc-400 font-mono font-semibold">
                                        {String.fromCharCode(65+key)}
                                    </div>

                                    <p className="text-zinc-100 text-lg text-left">{item.text}</p>
                                </button>
                            ))}
                        </div>

                        <button disabled={timesup||voted}  className={`${timesup||voted?"hover:cursor-not-allowed opacity-50":"hover:cursor-pointer"} w-full border border-green-500 text-white px-4 py-3 hover:border-[#2a2a2a] transition duration-400`} onClick={submitvote}>Submit</button>
                    </div>
                </div>
                : <Participantlobby leaveroom={leaveroom} qdata={qdata} count={count} />
            }
        </div>
    )
}

export default quizques
