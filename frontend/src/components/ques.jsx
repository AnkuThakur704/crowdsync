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
  }
  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] text-white flex flex-col  items-center justify-center px-4 pt-20 ">
      {islive?<div className="w-full max-w-3xl mx-auto">
  <div className="rounded-2xl border border-amber-500/20 bg-zinc-900/70 backdrop-blur-md shadow-xl p-6">
    
    {/* Question */}
    <div className="flex items-start gap-3 mb-6">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-500 text-black font-bold">
        {currquesidx + 1}
      </div>

      <p className="text-xl font-semibold text-white leading-relaxed">
        {currques.statement}
      </p>
    </div>

    {/* Options */}
    <div className="space-y-3">
      {currques.options.map((item, key) => (
        <button onClick={()=>incvotecount(key)}
          key={key}
          className="flex items-center gap-4 rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-3 transition-all duration-200 active:border-amber-500 hover:bg-zinc-800 cursor-pointer"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-700 text-amber-400 font-semibold">
            {key + 1}
          </div>

          <p className="text-zinc-100">{item.text}</p>
        </button>
      ))}
    </div>

    <button onClick={submitvote}>Submit</button>
  </div>
</div>:<Participantlobby leaveroom={leaveroom} qdata={qdata} count={count}/>}
    </div>
  )
}

export default ques

