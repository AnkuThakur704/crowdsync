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
    <div className="h-screen w-screen relative bg-white text-gray-900 flex flex-col items-center justify-center px-4 pt-20">

    {currques!=null?<div className="w-full rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-indigo-100/40">

        <div className="absolute right-10 top-25 flex items-center gap-3">

    <button
        onClick={getquestion}
        className="px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 cursor-pointer transition-all duration-300"
    >
        Next
    </button>

    <button
        onClick={()=>endlive(navigate)}
        className="px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 cursor-pointer transition-all duration-300"
    >
        End Live
    </button>

</div>


        {/* Question */}

        <div className="mb-8">

            <p className="text-sm font-semibold text-indigo-600 mb-2">
                Live Question
            </p>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                Question {currquesidx + 1}
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
                {currques.statement}
            </p>

        </div>


        <div className="mb-5 flex items-center justify-between">

            <div>
                <p className="text-sm text-gray-400">
                    Total votes till now
                </p>

                <p className="text-3xl font-extrabold text-gray-900 mt-1">
                    {totalVotes}
                </p>
            </div>

        </div>


        {/* Live Graph */}

        <div className="h-[420px] border border-gray-200 rounded-2xl bg-gray-50 p-6">

            <div className="flex items-end justify-evenly h-full gap-6">

                {currques.options.map((item, key) => (

                    <div
                        key={key}
                        className="flex flex-col items-center justify-end h-full flex-1"
                    >

                        {/* Vote Count */}

                        <p className="text-indigo-600 font-bold mb-2">
                            {totalVotes===0?0:votes[key]}
                        </p>


                        {/* Bar */}

                        <div className="w-full max-w-[70px] h-full flex items-end">

                            <div
                                className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-violet-400 transition-all duration-500"
                                style={{
                                    height:
                                        totalVotes === 0
                                            ? "0%"
                                            : `${(votes[key] / totalVotes) * 100}%`,
                                }}
                            />

                        </div>


                        {/* Option Number */}

                        <div className="mt-4 w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-indigo-600 font-semibold shadow-sm">
                            {key + 1}
                        </div>


                        {/* Option Text */}

                        <p className="mt-2 text-center text-sm text-gray-500 break-words max-w-[120px]">
                            {item.text}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    </div>:<div>{queshasended?<div className="flex flex-col items-center">

        <p className="text-2xl font-bold text-gray-900 mb-5">
            The questionnaire has ended
        </p>

        <button
            onClick={()=>endlive(navigate)}
            className="px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 cursor-pointer transition-all duration-300"
        >
            End Live
        </button>

    </div>:<p className="text-gray-400 text-lg">Loading the question...</p>}</div>}

</div>
  )
}

export default live
