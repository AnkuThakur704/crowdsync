import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import socket from "../socket/socket"
import { endlive } from "./helpers"

const quizlive = () => {
  const navigate = useNavigate()
    const [currquesidx, setcurrquesidx] = useState(0)
    const [currques, setcurrques] = useState()
    const [usercount, setusercount] = useState(0)
    const [showleaderboard, setshowleaderboard] = useState(false)
    const [leaderboard, setleaderboard] = useState()
    const [quizended, setquizended] = useState(false)
    const [time, settime] = useState(-1)
    useEffect(() => {
        getquestion()
    }, [])
    useEffect(() => {
        socket.on("questionchanged", (res)=>{
            setcurrquesidx(res.idx)
            setcurrques(res.question)
        })
    
      return () => {
        socket.off("questionchanged")
      }
    }, [])
    
    
    const getquestion = ()=>{
      const params = new URLSearchParams(window.location.search)
      const param_id = params.get("id")
      setcurrques()
      setcurrquesidx(0)
    //   settotalVotes(0)
    //   setvotes()
      socket.emit("givequestion", param_id)
      socket.emit("giveusercount", param_id)
    }
    
    useEffect(() => {
      socket.on("takeusercount", (usercount)=>{
        setusercount(usercount)
      })
    
      return () => {
        socket.off("takeusercount")
      }
    }, [])

    useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      const param_id = params.get("id")
      socket.on("timesup", ()=>{
        socket.emit("giveleaderboard", param_id)
      })
      return ()=>{
        socket.off("timesup")
      }
    }, [])
    
    useEffect(() => {
      socket.on("takeleaderboard", (leaderboard)=>{
        setleaderboard(leaderboard)
        setshowleaderboard(true)
        console.log("leaderborad:", leaderboard)
      })
    
      return () => {
        socket.off("takeleaderboard")
      }
    }, [])

    useEffect(() => {
      socket.on("queshasended",()=>{
        setquizended(true)
        setshowleaderboard(true)
        const params = new URLSearchParams(window.location.search)
      const param_id = params.get("id")
      socket.emit("giveleaderboard", param_id)
      } )

      return () => {
        socket.off("queshasended")
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

    const loadnext = ()=>{
      getquestion()
      setshowleaderboard(false)
    }

  return (
   <div className="h-screen w-screen relative bg-[#1a1a1a] text-white flex flex-col items-center justify-center px-4 pt-20 ">
      {(currques!=null)||quizended?<div className="w-full max-w-3xl mx-auto">
        {showleaderboard?<div className="bg-[#2a2a2a] border border-white p-8">

          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>

          {quizended&&<p className="text-gray-400 mb-6">The quiz has ended</p>}

          {leaderboard.length!=0?<div className="space-y-3 mb-6">
            {leaderboard.map((item,key)=>
            <div key={key} className="flex items-center gap-4 border-l-2 border-l-green-400 pl-4 py-2 bg-zinc-700/40">
              <p className="font-mono text-gray-400 w-6">{key+1}</p>
              <p className="flex-1 font-medium">{item.username}</p>
              <p className="font-semibold text-green-400">{item.score}</p>
            </div>
          )}
          </div>:<div className="text-gray-500 text-center py-10">Loading...</div>}

          {quizended?<button
                        onClick={()=>endlive(navigate)}
                        className="w-30 border border-red-500 text-white px-4 py-3 hover:cursor-pointer hover:border-[#2a2a2a] transition duration-400"
                      >
                        End Live
                </button>:<button onClick={loadnext} className="w-40 border border-green-500 text-white px-4 py-3 hover:cursor-pointer hover:border-[#2a2a2a] transition duration-400">Next question</button>}
        </div>:
        <div className="w-full flex flex-col gap-5">

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-[#2a2a2a] border border-white p-6 flex flex-col items-center">
              <p className="text-gray-400 text-sm tracking-wide uppercase">Participants</p>
              <h2 className="text-2xl font-bold mt-2 text-green-400">{usercount}</h2>
            </div>
            <div className="bg-[#2a2a2a] border border-white p-6 flex flex-col items-center">
              <p className="text-gray-400 text-sm tracking-wide uppercase">Time Left</p>
              <h2 className={`text-2xl font-bold mt-2 ${time>5?"text-green-400":"text-red-400"}`}>{time}</h2>
            </div>
          </div>

          <div className="bg-[#2a2a2a] border border-white p-10 flex flex-col items-center text-center">
            <p className="text-3xl font-bold leading-snug">{currques.statement}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {currques.options.map((item,key)=>
            <div
              key={key}
              className="group flex items-center gap-4 bg-zinc-800 border border-zinc-500 px-5 py-5 hover:border-white hover:bg-zinc-700 transition duration-300"
            >
                <div className="flex items-center justify-center h-9 w-9 shrink-0 border border-zinc-400 font-mono text-sm font-bold group-hover:border-white group-hover:text-white">
                  {String.fromCharCode(65+key)}
                </div>
                <p className="text-lg font-medium">{item.text}</p>
            </div>)}
          </div>

        </div>}
      </div>:<div className="text-gray-400 text-center">Loading the question</div>}
    </div>
  )
}


{/* <div className="h-screen w-screen relative bg-[#1a1a1a] text-white flex flex-col  items-center justify-center px-4 pt-20 ">
      {(currques!=null)||quizended?<div>
        {showleaderboard?<div>
          <p>Leaderboard</p>
          {quizended&&<p>The quiz has ended</p>}
          {leaderboard.length!=0?<div>
            {leaderboard.map((item,key)=>
            <div>
              <p>{key+1}</p>
              <p>{item.username}</p>
              <p>{item.score}</p>
            </div>
          )}
          </div>:<div>Loading...</div>}
          {quizended?<button
                        onClick={()=>endlive(navigate)}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                      >
                        End Live
                </button>:<button onClick={loadnext}>Next question</button>}
        </div>:
        <div>
          <div>usercount : {usercount}</div>
          <div>Time: {time}</div>
        <p>{currques.statement}</p>
        {currques.options.map((item,key)=>
        <div>
            <p>{key+1}</p>
            <p>{item.text}</p>
        </div>)}
        </div>}
      </div>:<div>Loading the question</div>}
    </div> */}

export default quizlive
