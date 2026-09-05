import { useState, useEffect } from "react"
import socket from "../socket/socket"
import { endlive } from "./helpers"
import { useNavigate } from "react-router"

const live = () => {
  console.log("this is page live")
  const navigate = useNavigate()
    const [currquesidx, setcurrquesidx] = useState(0)
    const [currques, setcurrques] = useState()
    const [votes, setvotes] = useState()
    const [totalVotes, settotalVotes] = useState(0)
    const [queshasended, setqueshasended] = useState(false)
    useEffect(() => {
      getquestion()
    }, [])
    useEffect(() => {
      socket.on("questionchanged",(res)=>{
        console.log("question to host:", res.question)
        setcurrques(res.question)
        setcurrquesidx(res.idx)
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
      settotalVotes(0)
      setvotes()
      socket.emit("givequestion", param_id)
    }
    useEffect(() => {
      socket.on("someonevoted",(data)=>{
        console.log("voted: ", data)
        settotalVotes(prev=> prev+1)
        let arr = []
        // data[0].question.options.map((item, key)=>{
        //   arr.push(item.votes)
        // })
        data.question.options.map((item, key)=>{
          arr.push(item.votes)
        })
        setvotes(arr)
        console.log("data sent on inc votes: ", data)
      })
    
      return () => {
        socket.off("someonevoted")
      }
    }, [])

    useEffect(() => {
      socket.on("queshasended",()=>{
        console.log("the poll has ended !!")
        setqueshasended(true)
      })  
    
      return () => {
        socket.off("queshasended")
      }
    }, [])
    
    
  return (
    <div className="h-screen w-screen relative bg-[#1a1a1a] text-white flex flex-col  items-center justify-center px-4 pt-20 ">  
      {currques!=null?<div className="w-full rounded-2xl border border-amber-500/20 bg-zinc-900/70 backdrop-blur-md p-6 shadow-xl">
      <button
              onClick={()=>endlive(navigate)}
              className="absolute right-10 top-10 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              End Live
      </button>
      <button
              onClick={getquestion}
              className="absolute left-70 top-10 px-5 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition"
            >
              Next
      </button>
    {/* Question */}
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
            Question {currquesidx + 1}
        </h2>

        <p className="text-lg text-zinc-200">
            {currques.statement}
        </p>
    </div>
    <div>Total votes till now: {totalVotes}</div>
    {/* Live Graph */}
    <div className="h-[420px] border border-zinc-700 rounded-xl bg-zinc-950/40 p-6">

        <div className="flex items-end justify-evenly h-full gap-6">

            {currques.options.map((item, key) => (

                <div
                    key={key}
                    className="flex flex-col items-center justify-end h-full flex-1"
                >

                    {/* Vote Count */}
                    <p className="text-amber-400 font-semibold mb-2">
                        {totalVotes===0?0:votes[key]}
                    </p>

                    {/* Bar */}
                    <div className="w-full max-w-[70px] h-full flex items-end">

                        <div
                            className="w-full rounded-t-xl bg-gradient-to-t from-amber-500 to-yellow-300 transition-all duration-500"
                            style={{
                                height:
                                    totalVotes === 0
                                        ? "0%"
                                        : `${(votes[key] / totalVotes) * 100}%`,
                            }}
                        />

                    </div>

                    {/* Option Number */}
                    <div className="mt-4 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400 font-semibold">
                        {key + 1}
                    </div>

                    {/* Option Text */}
                    <p className="mt-2 text-center text-sm text-zinc-300 break-words">
                        {item.text}
                    </p>

                </div>

            ))}

        </div>

    </div>

</div>:<div>{queshasended?<div className="flex flex-col items-center">
  <p>The questionnaire has ended</p>
  <button
              onClick={()=>endlive(navigate)}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              End Live
      </button>
</div>:<p>Loading the question...</p>}</div>}
    </div>
  )
}

export default live
