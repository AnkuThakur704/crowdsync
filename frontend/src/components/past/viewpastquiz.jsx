import { useState, useEffect} from "react"
import givelastupdated from "../../../helpers/getdate"
import Quicknav from "../smallcompo/quicknav"
const backend_url = import.meta.env.VITE_BACKEND_URL

const viewpastquiz = () => {
    const [leaderboard, setleaderboard] = useState()

    const getleaderboard = async()=>{
        const params = new URLSearchParams(window.location.search)
        const qid = params.get("qid")
        const instance = params.get("instance")
        let data  = await fetch(`${backend_url}/routes/viewpastquiz?qid=${qid}&instance=${instance}`)
        const status = data.status
        data = await data.json()
        if(status===200){
            setleaderboard(data.leaderboard)
        }
    } 

    useEffect(()=>{
        getleaderboard()
    }, [])
    useEffect(()=>{
    }, [leaderboard])

  return (
    <div className="min-h-screen bg-white text-gray-900 px-8 pt-24 pb-10">
  <Quicknav />

  {leaderboard ? (
    <div className="max-w-5xl mx-auto">

      {/* Header / Quiz Info */}
      <div className="mb-8">

        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200">
            Leaderboard
          </span>

          <span className="text-sm text-gray-400">
            Instance {leaderboard.instance}
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {leaderboard.qname}
        </h1>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-gray-400">
          <p>
            Quiz ID:
            <span className="ml-2 font-mono text-gray-600">
              {leaderboard.qid}
            </span>
          </p>

          <p>
            Last hosted:
            <span className="ml-2 text-gray-600">
              {givelastupdated(leaderboard.updatedAt)}
            </span>
          </p>
        </div>
      </div>

      {/* Leaderboard Card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

        {/* Table Header */}
        <div className="grid grid-cols-[80px_1fr_120px] items-center px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400 font-semibold">
          <p>Rank</p>
          <p>Player</p>
          <p className="text-right">Score</p>
        </div>

        {/* Players */}
        <div>
          {leaderboard.leaderboard?.length > 0 ? (
            leaderboard.leaderboard.map((player, key) => (
              <div
                key={key}
                className={`grid grid-cols-[80px_1fr_120px] items-center px-6 py-5
                  border-b border-gray-100 last:border-b-0
                  transition-all duration-200
                  hover:bg-indigo-50/50
                  ${key < 3 ? "bg-indigo-50/20" : ""}
                `}
              >

                {/* Rank */}
                <div>
                  {key === 0 ? (
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
                      1
                    </div>
                  ) : key === 1 ? (
                    <div className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-bold">
                      2
                    </div>
                  ) : key === 2 ? (
                    <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 font-bold">
                      3
                    </div>
                  ) : (
                    <span className="text-gray-400 font-medium pl-3">
                      {key + 1}
                    </span>
                  )}
                </div>

                {/* Player */}
                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 font-semibold">
                    {player.username?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {player.username}
                    </p>

                    {key === 0 && (
                      <p className="text-xs text-amber-500 mt-0.5 font-medium">
                        Top Player
                      </p>
                    )}
                  </div>

                </div>

                {/* Score */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {player.score}
                  </p>

                  <p className="text-xs text-gray-400">
                    points
                  </p>
                </div>

              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-gray-400">
                No players have participated yet.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  ) : (
    /* Error / Loading State */
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">

        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
          <span className="text-indigo-600 text-xl font-semibold">!</span>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Leaderboard unavailable
        </h2>

        <p className="text-sm text-gray-400">
          We couldn't load the quiz results right now.
        </p>

      </div>
    </div>
  )}
</div>
  )
}

export default viewpastquiz
