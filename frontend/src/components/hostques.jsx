import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Qrcode from 'react-qr-code'
import socket from '../socket/socket'
import { useAuth } from "../../helpers/Authcontext"
import {message} from "./toast"
import { ToastContainer } from 'react-toastify';
import { endlive } from "./helpers"

const backend_url = import.meta.env.VITE_BACKEND_URL
// const id = params.get("id")
// const qrurl = `http://localhost:5173/joinques?i=${id}`
const hostques = () => {
  // the poll will not start right away, first wait for participants to join. 
  const navigate = useNavigate()
  const { userdata } = useAuth()
  const [allparticipants, setallparticipants] = useState([])
  const [metadata, setmetadata] = useState({
    type: "",
    qname: "",
    author: ""
  })
  const [id, setid] = useState("")
  const [qrurl, setqrurl] = useState("")
  const [count, setcount] = useState(0)
  useEffect(() => {
    //fetch poll meta data from backend
    getmetadata()
  }, [])

  const getmetadata = async () => {
    const params = new URLSearchParams(window.location.search)
    const params_id = params.get("id")
    console.log("req sent", params_id)
    setid(params_id)
    setqrurl(`http://localhost:5173/joinques?id=${params_id}`)
    const r = await fetch(`${backend_url}/routes/getqmetadata `, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        qid: params_id
      })
    })
    const data = await r.json()
    console.log("meta data: ", data)
    setmetadata({ type: data.type, qname: data.qname, author: data.author })
  }

  

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const params_id = params.get("id")
    socket.connect()
    socket.emit("hostjoin", { qid: params_id, username: userdata.email.split('@')[0] })
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
    socket.on("participantname", (username) => {
      setallparticipants(prev => [...prev, { username: username, status: "joined" }])
    })
    return () => {
      socket.off("participantname")
    }
  }, [])

  useEffect(() => {
    socket.on("leftname", (username) => {
      setallparticipants(prev => [...prev, { username: username, status: "left" }])
    })

    return () => {
      socket.off("leftname")
    }
  }, [])

  const copyqid = async () => {
    const params = new URLSearchParams(window.location.search)
    const params_id = params.get("id")
    await navigator.clipboard.writeText(params_id)
    message("Qid copied!")
  }

  const startques = async()=>{
    if(count<=0) return 
    const params = new URLSearchParams(window.location.search)
    const params_id = params.get("id")
    let nexturl = metadata.type==="poll"?`/live?id=${params_id}`:`/quizlive?id=${params_id}`
    navigate(nexturl)
  }

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] text-white flex flex-col  items-center justify-center px-4 pt-20 ">
      <ToastContainer/>

      {metadata.qid != "" ? (
        <div className="w-full max-w-5xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mt-2">
                {metadata.qname}
              </h1>

              <p className="text-gray-400 mt-1">
                Waiting for participants to join...
              </p>
            </div>

            <button
              onClick={()=>endlive(navigate)}
             className=" w-30 border border-red-500 text-white  px-4 py-3 hover:cursor-pointer hover:border-[#2a2a2a] transition duration-400"
            >
              End Live
            </button>
          </div>

          {/* <div>
      <p>Participants</p>
      {allparticipants.map((item, key)=>
      <p key={key}>{item.username} {item.status}</p>)}
    </div> */}

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

            {/* Left Activity Panel */}
            <div className="bg-[#2a2a2a] border border-white  p-5 h-full max-h-110 flex flex-col">

              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold">
                  Live Activity
                </h3>

                <span className="text-xs text-gray-400">
                  {allparticipants.length} events
                </span>
              </div>

              <div className="flex-1 max-h-100 overflow-y-auto space-y-3 pr-2">
                {allparticipants.length === 0 ? (
                  <p className="text-gray-500 text-center mt-10">
                    Waiting for participants...
                  </p>
                ) : (
                  allparticipants.map((item, key) => (
                    <div
                      key={key}
                      className="flex items-start gap-3 border-l-2 pl-4 py-2 border-l-green-400"
                    >
                      <div
                        className={`mt-2 h-2.5 w-2.5 rounded-full ${item.status === "joined"
                          ? "bg-green-400"
                          : "bg-red-400"
                          }`}
                      />

                      <div className="flex-1">
                        <p className="font-medium">
                          {item.username}
                        </p>

                        <p
                          className={`text-sm ${item.status === "joined"
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                        >
                          {item.status === "joined"
                            ? "Joined the session"
                            : "Left the session"}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Right Side (YOUR OLD LAYOUT) */}
            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-[#2a2a2a] border border-white  p-8 flex flex-col items-center">

                <Qrcode value={qrurl} size={220} className="border-8 border-white"/>

                <p className="text-sm text-gray-500 mt-6 text-center break-all">
                  {qrurl}
                </p>

              </div>

              <div className="flex flex-col gap-5">

                <div className="bg-[#2a2a2a] border border-white  p-6 relative">

                  <button onClick={startques} className="absolute right-4 w-30 border border-green-500 text-white  px-4 py-3 hover:cursor-pointer hover:border-[#2a2a2a] transition duration-400">
                    Start {metadata.type}
                  </button>

                  <p className="text-gray-400 text-sm">
                    Participants
                  </p>

                  <h2 className="text-5xl font-bold mt-2">
                    {count}
                  </h2>

                </div>

                <div className="bg-[#2a2a2a] border border-white  p-6 space-y-5">

                  <div className="flex flex-col gap-2.5">
                    <p className="text-gray-400 text-sm">
                      QID
                    </p>
                    <div className="flex items-center gap-1.5 bg-zinc-700 border border-zinc-200 px-2.5 py-0.5 ">
                      <p className="font-mono text-sm mt-1 break-all">
                      {id}
                    </p>
                    <button className="text-sm bg-zinc-600 border border-zinc-500 px-2 py-0.5 hover:cursor-copy hover:text-zinc-300"  onClick={copyqid}>Copy</button>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Author
                    </p>

                    <p className="text-lg mt-1">
                      {metadata.author}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Type
                    </p>

                    <p className="capitalize text-lg mt-1">
                      {metadata.type}
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>


        </div>
      ) : (
        <div className="text-red-400 text-center">
          Something went wrong.
        </div>
      )}

    </div>
  )
}

export default hostques
