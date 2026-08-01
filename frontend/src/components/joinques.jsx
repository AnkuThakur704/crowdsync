import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import socket from "../socket/socket"
import Quicknav from "./smallcompo/quicknav"
const backend_url = import.meta.env.VITE_BACKEND_URL

const joinques = () => {
  const navigate = useNavigate()
  const [qid, setqid] = useState("")
  const [notlive, setnotlive] = useState(false)
  const handlejoin = async(e)=>{
    e.preventDefault()
    const r = await fetch(`${backend_url}/routes/checkqidandlivestatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        qid: qid
      })
    })
    const data = await r.json()
    if(r.status==200){
      let nextendpoint = data.type
      navigate(`/${nextendpoint}ques?id=${qid}`)
    }
    else{
      setnotlive(true)
    }
  }
  return (
    <div className='min-h-screen w-full bg-[#1a1a1a] text-white flex flex-col  items-center justify-center px-4 pt-20 '>
      <Quicknav/>
      <form onSubmit={handlejoin} className="w-full max-w-md mx-auto bg-[#2a2a2a] border border-white p-8 flex flex-col items-center gap-6">
  <h2 className="text-3xl font-bold text-white">Join Session</h2>

  <p className="text-gray-400 text-center">
    Paste the <span className="text-green-400 font-semibold">QID</span> shared by
    the host.
  </p>

  <input
    type="text"
    placeholder="Enter QID..."
    onChange={(e) => setqid(e.target.value)}
    className="w-full bg-zinc-700 border border-zinc-500 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-white transition"
  />

  <button
    type="submit"
    className="w-full border border-green-500 text-white font-semibold py-3 hover:cursor-pointer hover:border-[#2a2a2a] transition duration-400"
  >
    Join Session
  </button>
  {notlive&&<p className="text-red-400">Invalid qid or the questionnaire is not live yet</p>}
</form>
    </div>
  )
}

export default joinques
