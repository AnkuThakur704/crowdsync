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
    <div className='min-h-screen w-full bg-white text-gray-900 flex flex-col items-center justify-center px-4 pt-20'>

    <Quicknav/>

    <form
        onSubmit={handlejoin}
        className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-xl shadow-indigo-100/40"
    >

        <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Join Session
            </h2>

        </div>


        <p className="text-gray-400 text-center leading-relaxed">
            Paste the <span className="text-indigo-600 font-semibold">QID</span> shared by
            the host.
        </p>


        <input
            type="text"
            placeholder="Enter QID..."
            onChange={(e) => setqid(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition"
        />


        <button
            type="submit"
            className="w-full bg-gray-900 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 cursor-pointer transition-all duration-300"
        >
            Join Session
        </button>


        {notlive&&<p className="text-red-500 text-sm text-center">Invalid qid or the questionnaire is not live yet</p>}

    </form>

</div>
  )
}

export default joinques
