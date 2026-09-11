import socket from "../socket/socket"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from '../../helpers/Authcontext'
import Participantlobby from "./smallcompo/participantlobby"
const backend_url = import.meta.env.VITE_BACKEND_URL

const ques = () => {
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
  let qtype = "";
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
      qtype = data.type
      console.log("slice: ", data)
    }
  }
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const params_id = params.get("id")
    socket.connect()
    socket.emit("joinroom", { qid: params_id, username: userdata.email.split('@')[0] , type:"poll"})
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


  const leaveroom = () => {
    const params = new URLSearchParams(window.location.search)
    const params_id = params.get("id")
    console.log("Leave called")
    socket.emit("leaveroom", { qid:params_id, username: userdata.email.split('@')[0] })
    socket.disconnect()
    console.log("is socket connected? ", socket.connected)
    navigate('/dashboard')

  }

  useEffect(() => {
    socket.on("questionchanged",(res)=>{
      setcurrquesidx(res.idx)
      setcurrques(res.question)
      setislive(true)
      setvoted(false)
      setvotedoption(-1)
      console.log("question: ",res.question)
    })
  
    return () => {
      socket.off("questionchanged")
    }
  }, [])
  

  const incvotecount = (idx)=>{
    setvotedoption(idx)
  }

  const submitvote = ()=>{
    const params = new URLSearchParams(window.location.search)
    const params_id = params.get("id")
    if(votedoption===-1) return
    console.log("option submitted: ", votedoption)
    socket.emit("incvotecount", {idx: currquesidx, votedoption: votedoption, qid: params_id})
    setvoted(true)
    setvotedoption(-1)
  }
  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col items-center justify-center px-4 pt-20">

    {islive ? <div className="w-full max-w-3xl mx-auto">

        <div className="rounded-3xl border border-gray-200 bg-white shadow-xl shadow-indigo-100/40 p-7 md:p-9">

            {/* Question */}

            <div className="flex items-start gap-4 mb-8">

                {voted && <p className="text-green-500 text-sm font-semibold mt-2">
                    Voted
                </p>}

                <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold shadow-sm">
                    {currquesidx + 1}
                </div>

                <p className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
                    {currques.statement}
                </p>

            </div>


            {/* Options */}

            <div className="space-y-3">

                {currques.options.map((item, key) => (

                    <button
                        onClick={()=>incvotecount(key)}
                        key={key}
                        className="w-full flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-left transition-all duration-200 hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-sm active:border-indigo-500 cursor-pointer"
                    >

                        <div className="flex items-center justify-center shrink-0 w-9 h-9 rounded-lg bg-white border border-gray-200 text-indigo-600 font-semibold">
                            {key + 1}
                        </div>

                        <p className="text-gray-700 font-medium">
                            {item.text}
                        </p>

                    </button>

                ))}

            </div>


            <button
                onClick={submitvote}
                className="w-full mt-8 py-3.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 cursor-pointer transition-all duration-300"
            >
                Submit
            </button>

        </div>

    </div> : <Participantlobby leaveroom={leaveroom} qdata={qdata} count={count}/>}

</div>
  )
}

export default ques

