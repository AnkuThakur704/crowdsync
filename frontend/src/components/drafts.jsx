import { useState, useEffect } from "react"
import LoadingAnim from "./loadingAnim"
import { Link } from 'react-router'
import Quicknav from "./smallcompo/quicknav"

const backend_url = import.meta.env.VITE_BACKEND_URL
const drafts = () => {
  const [alldrafts, setalldrafts] = useState([])
  const onreload = async () => {
    const r = await fetch(`${backend_url}/routes/drafts`, {
      method: "GET",
      credentials: "include"
    })
    const data = await r.json()
    if (r.status === 200) {
      console.log("dfr", data.drafts)
      setalldrafts(data.drafts)
      console.log("all drafts: ", alldrafts)
    }

  }

  const givelastupdated = (updatedAt)=>{

      const dt = new Date(updatedAt);
      const diff = Date.now() - dt;
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let text;

      if (minutes < 60) {
        text = `Last updated ${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
      } else if (hours < 24) {
        text = `Last updated ${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
      } else {
        text = `Last updated ${days} ${days === 1 ? "day" : "days"} ago`;
      }
      return text;
    
  }

  useEffect(() => {
    onreload()
    console.log("all drafts: ", alldrafts)
  }, [])
  useEffect(() => {
    console.log("all drafts CHANGED: ", alldrafts)

  }, [alldrafts])


  return (

    <div className="min-h-screen bg-[#1f1f1f] text-white px-8 pt-24 pb-10">
      <div className="max-w-7xl mx-auto">
        <Quicknav/>

        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight">
            Your Drafts
          </h1>
          <p className="text-zinc-400 mt-3 text-lg">
            Continue editing saved polls and quizzes.
          </p>
        </div>

        {alldrafts.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {alldrafts.map((item, key) => (
              <div
                key={key}
                className="group bg-zinc-900/80 border border-white  p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(252,211,77,0.2)]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5"><span className="px-3 py-1 border-2 border-green-400/10 text-green-300 text-sm">
                    {item.type}
                  </span>
                    <span className="px-3 py-1 border-2 border-green-400/10 text-green-300 text-sm">
                      {givelastupdated(new Date(item.updatedAt)) }
                    </span>

                  </div>

                  <span className="text-zinc-500 text-sm">
                    {item.pages.length} Pages
                  </span>
                </div>

                <h2 className="text-2xl font-semibold mb-4 line-clamp-2">
                  {item.qname}
                </h2>

                <div className="space-y-2 text-zinc-400 text-sm">
                  <p>
                    Draft ID
                  </p>
                  <p className="font-mono text-zinc-300 break-all">
                    {item.qid}
                  </p>
                </div>
                <Link to={`/studio?id=${item.qid}`} >
                  <button className="mt-8 w-full py-3 bg-zinc-900/80 text-white border border-green-400 font-semibold transition-all duration-300 hover:border-zinc-900/80 hover:cursor-pointer">
                    Continue Editing
                  </button></Link>
              </div>

            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[55vh] text-center">
            <div className="border border-amber-300/20 bg-zinc-900/60 backdrop-blur-sm  px-12 py-10">
              <h2 className="text-3xl font-semibold mb-3">
                No Drafts Yet
              </h2>

              <p className="text-zinc-400 max-w-md">
                Your saved polls and quizzes will appear here. Create your first questionnaire and pick up where you left off anytime.
              </p>

              <Link to={'/studio'}><button className="mt-8 px-8 py-3  border border-amber-300 text-white font-semibold transition-all duration-500 hover:border-zinc-900/60">
                Visit Studio
              </button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default drafts

