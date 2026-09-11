import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router"
import {useAuth} from "../../helpers/Authcontext"
import Quicknav from "./smallcompo/quicknav"

const url = import.meta.env.VITE_BACKEND_URL
const dashboard = () => {
  const {userdata} = useAuth()
  const [stats, setstats] = useState()
    const navigate = useNavigate()
    const onReload = async ()=>{
        const r = await fetch(`${url}/routes/dashboard`,{method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }

        })
        const data = await r.json()
        setstats(data.stats)
        console.log("dashdata: ", data)
        if(r.status===401){
            navigate('/login')
        }
    }


    useEffect(() => {
      onReload()
    }, [])

    return(
      <>
  <div className="h-full w-full min-h-screen bg-white text-gray-900 flex items-center justify-center px-6 relative overflow-hidden pt-20 z-0">

    <Quicknav />

    {/* Background decoration */}

    <div className="absolute w-[500px] h-[500px] bg-indigo-100/50 blur-3xl rounded-full -top-40 -left-40"></div>

    <div className="absolute w-[450px] h-[450px] bg-violet-100/40 blur-3xl rounded-full bottom-[-150px] right-[-100px]"></div>


    {/* Dashboard */}

    <div className="relative z-10 w-full max-w-6xl">

      {/* Top section */}

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-stretch">


        {/* Welcome */}

        <div className="flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-[-0.05em] text-gray-900 leading-[1.05]">
            Welcome,
            <br />
            {userdata.name}
          </h1>

        </div>


        {/* Statistics */}

        <div className="grid grid-cols-2 gap-5">

          {/* Total Questionnaires */}

          <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm flex flex-col justify-between min-h-[190px]">

            {stats?<div>
              <div>
              <p className="text-sm font-medium text-gray-400">
                Total Questionnaires
              </p>

              <p className="text-5xl font-extrabold text-gray-900 mt-4">
                {stats.totalques}
              </p>
            </div>

            <p className="text-xs text-gray-400">
              Created by you
            </p>
              </div>:<p>Not available</p>}

          </div>


          {/* Hosted Questionnaires */}

          <div className="bg-gray-900 rounded-2xl p-7 shadow-lg shadow-gray-900/10 flex flex-col justify-between min-h-[190px]">

            {stats?<div>
<div>
              <p className="text-sm font-medium text-gray-400">
                Questionnaires Hosted
              </p>

              <p className="text-5xl font-extrabold text-white mt-4">
                {stats.hosted}
              </p>
            </div>

            <p className="text-xs text-gray-500">
              Live sessions hosted
            </p>

            </div>:<p className="text-white">Not available</p>}

          </div>

        </div>

      </div>


      {/* Bottom section */}

      <div className="grid lg:grid-cols-[1fr_260px] gap-8 mt-8">


        {/* Empty / activity area */}

        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 border border-gray-200 rounded-2xl min-h-[300px] p-8">

          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mt-3">
              Your interactive space.
            </h2>

            <p className="text-gray-400 mt-3 max-w-md">
              Create a questionnaire and bring your audience into the
              conversation in real time.
            </p>

          </div>


          {/* Decorative dots */}

          <div className="absolute right-10 bottom-8 grid grid-cols-6 gap-3 opacity-40">

            {Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index}
                className={`rounded-full bg-indigo-400 ${
                  index % 5 === 0
                    ? "w-3 h-3"
                    : index % 3 === 0
                    ? "w-2 h-2"
                    : "w-1.5 h-1.5"
                }`}
              ></div>
            ))}

          </div>

        </div>


        {/* Actions */}

        <div className="flex flex-col gap-4 justify-end">

          <Link to={'/studio'}>
            <button
              className="w-full bg-gray-900 text-white font-semibold py-4 rounded-xl hover:bg-indigo-600 cursor-pointer transition duration-300 shadow-lg shadow-gray-900/10"
            >
              Create
              <span className="ml-2">→</span>
            </button>
          </Link>


          <Link to={'/joinques'}>
            <button
              className="w-full bg-white text-gray-700 font-semibold py-4 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition duration-300"
            >
              Join
              <span className="ml-2">→</span>
            </button>
          </Link>

        </div>

      </div>

    </div>

  </div>
</>
    )
  }

  export default dashboard
