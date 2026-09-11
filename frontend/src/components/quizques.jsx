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
            setvotedoption(-1)
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
        <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col items-center justify-center px-4 pt-20">

    {islive ?
        <div className="w-full max-w-3xl mx-auto">

            <div className="relative border border-gray-200 bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-indigo-100/40">

                {/* Time */}
                <div className="text-gray-400 text-sm tracking-wide uppercase mb-7">
                    Time left:{" "}
                    <span
                        className={`${time > 5
                            ? "text-emerald-500"
                            : "text-red-500"
                            } font-bold`}
                    >
                        {time}
                    </span>
                </div>

                {voted &&
                    <p className="text-emerald-500 text-sm font-medium absolute right-8 top-8">
                        Your reponse has been recorded
                    </p>
                }

                {/* Question */}
                <div className="flex items-start gap-4 mb-9">

                    <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold">
                        {currquesidx + 1}
                    </div>

                    <p className="text-2xl font-bold text-gray-900 leading-relaxed">
                        {currques.statement}
                    </p>

                </div>


                {/* Options */}
                <div className="space-y-3 mb-8">

                    {currques.options.map((item, key) => (
                        <button
                            onClick={() => incvotecount(key)}
                            key={key}
                            className={`w-full flex items-center gap-4 rounded-xl border ${
                                (votedoption != -1 && votedoption == key)
                                    ? "border-indigo-500 bg-indigo-50"
                                    : "border-gray-200 bg-gray-50"
                            } px-5 py-4 transition-all duration-300 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer`}
                        >

                            <div
                                className={`flex items-center justify-center w-9 h-9 shrink-0 rounded-lg border font-mono font-semibold ${
                                    (votedoption != -1 && votedoption == key)
                                        ? "border-indigo-300 bg-white text-indigo-600"
                                        : "border-gray-200 bg-white text-gray-500"
                                }`}
                            >
                                {String.fromCharCode(65 + key)}
                            </div>

                            <p className="text-gray-700 text-lg text-left">
                                {item.text}
                            </p>

                        </button>
                    ))}

                </div>


                <button
                    disabled={timesup || voted}
                    className={`${
                        timesup || voted
                            ? "hover:cursor-not-allowed opacity-50 bg-gray-900"
                            : "hover:cursor-pointer bg-gray-900 hover:bg-indigo-600"
                    } w-full text-white font-semibold px-4 py-3.5 rounded-xl transition-all duration-300 shadow-sm`}
                    onClick={submitvote}
                >
                    Submit
                </button>

            </div>

        </div>
        : <Participantlobby leaveroom={leaveroom} qdata={qdata} count={count} />
    }

</div>
    )
}

export default quizques
