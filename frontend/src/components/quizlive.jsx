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
    socket.on("questionchanged", (res) => {
      setcurrquesidx(res.idx)
      setcurrques(res.question)
    })

    return () => {
      socket.off("questionchanged")
    }
  }, [])


  const getquestion = () => {
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
    socket.on("takeusercount", (usercount) => {
      setusercount(usercount)
    })

    return () => {
      socket.off("takeusercount")
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const param_id = params.get("id")
    socket.on("timesup", () => {
      socket.emit("giveleaderboard", param_id)
    })
    return () => {
      socket.off("timesup")
    }
  }, [])

  useEffect(() => {
    socket.on("takeleaderboard", (leaderboard) => {
      setleaderboard(leaderboard)
      setshowleaderboard(true)
      console.log("leaderborad:", leaderboard)
    })

    return () => {
      socket.off("takeleaderboard")
    }
  }, [])

  useEffect(() => {
    socket.on("queshasended", () => {
      setquizended(true)
      setshowleaderboard(true)
      const params = new URLSearchParams(window.location.search)
      const param_id = params.get("id")
      socket.emit("giveleaderboard", param_id)
    })

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

  const loadnext = () => {
    getquestion()
    setshowleaderboard(false)
  }

  return (
    <div className="h-screen w-screen relative bg-white text-gray-900 flex flex-col items-center justify-center px-4 pt-20">

  {(currques != null) || quizended ? <div className="w-full max-w-3xl mx-auto">

    {showleaderboard ?
      <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-indigo-100/40">

        <div className="mb-7">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Leaderboard
          </h1>

          {quizended &&
            <p className="text-gray-400 mt-2">
              The quiz has ended
            </p>
          }
        </div>


        {leaderboard.length != 0 ?
          <div className="space-y-3 mb-8">

            {leaderboard.map((item, key) =>
              <div
                key={key}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-200"
              >

                <p className="font-mono text-gray-400 w-6">
                  {key + 1}
                </p>

                <p className="flex-1 font-semibold text-gray-800">
                  {item.username}
                </p>

                <p className="font-bold text-indigo-600">
                  {item.score}
                </p>

              </div>
            )}

          </div>
          :
          <div className="text-gray-400 text-center py-10">
            Loading...
          </div>
        }


        {quizended ?
          <button
            onClick={() => endlive(navigate)}
            className="w-full sm:w-auto border border-red-200 bg-red-50 text-red-600 font-semibold px-6 py-3 rounded-xl hover:bg-red-100 hover:border-red-300 cursor-pointer transition-all duration-300"
          >
            End Live
          </button>
          :
          <button
            onClick={loadnext}
            className="w-full sm:w-auto bg-gray-900 text-white px-7 py-3 rounded-xl font-semibold hover:bg-indigo-600 cursor-pointer transition-all duration-300 shadow-sm"
          >
            Next question
          </button>
        }

      </div>
      :
      <div className="w-full flex flex-col gap-5">

        <div className="flex justify-end">

          <button
            onClick={() => endlive(navigate)}
            className="border border-red-200 bg-red-50 text-red-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-red-100 hover:border-red-300 cursor-pointer transition-all duration-300"
          >
            End Live
          </button>

        </div>


        <div className="grid grid-cols-2 gap-5">

          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center shadow-sm">
            <p className="text-gray-400 text-sm tracking-wide uppercase">
              Participants
            </p>

            <h2 className="text-3xl font-bold mt-2 text-indigo-600">
              {usercount}
            </h2>
          </div>


          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center shadow-sm">

            <p className="text-gray-400 text-sm tracking-wide uppercase">
              Time Left
            </p>

            <h2
              className={`text-3xl font-bold mt-2 ${
                time > 5
                  ? "text-emerald-500"
                  : "text-red-500"
              }`}
            >
              {time}
            </h2>

          </div>

        </div>


        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 flex flex-col items-center text-center shadow-sm">

          <p className="text-3xl font-bold leading-snug tracking-tight text-gray-900">
            {currques.statement}
          </p>

        </div>


        <div className="grid sm:grid-cols-2 gap-4">

          {currques.options.map((item, key) =>
            <div
              key={key}
              className="group flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-5 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-sm transition-all duration-300"
            >

              <div className="flex items-center justify-center h-9 w-9 shrink-0 rounded-lg border border-gray-200 bg-gray-50 font-mono text-sm font-bold text-gray-500 group-hover:border-indigo-200 group-hover:text-indigo-600 group-hover:bg-white">
                {String.fromCharCode(65 + key)}
              </div>

              <p className="text-lg font-medium text-gray-700">
                {item.text}
              </p>

            </div>
          )}

        </div>

      </div>
    }

  </div> :
    <div className="text-gray-400 text-center">
      Loading the question
    </div>
  }

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
