import { useState, useEffect } from "react"
import LoadingAnim from "./loadingAnim"
import { Link } from 'react-router'
import Quicknav from "./smallcompo/quicknav"
import givelastupdated from "../../helpers/getdate"

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

  

  useEffect(() => {
    onreload()
    console.log("all drafts: ", alldrafts)
  }, [])
  useEffect(() => {
    console.log("all drafts CHANGED: ", alldrafts)

  }, [alldrafts])


  return (

    <div className="min-h-screen bg-white text-gray-900 px-8 pt-24 pb-10">
  <div className="max-w-7xl mx-auto">

    <Quicknav />

    <div className="mb-12">
      <h1 className="text-5xl font-extrabold tracking-[-0.04em]">
        Your Drafts
      </h1>

      <p className="text-gray-400 mt-3 text-lg">
        Continue editing saved polls and quizzes.
      </p>

    </div>

    {alldrafts.length !== 0 ? (

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {alldrafts.map((item, key) => (

          <div
            key={key}
            className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/40"
          >

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-2.5">

                <span className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium">
                  {item.type}
                </span>

                <span className="px-3 py-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 text-sm">
                  Last updated {givelastupdated(new Date(item.updatedAt))}
                </span>

              </div>

              <span className="text-gray-400 text-sm whitespace-nowrap">
                {item.pages.length} Pages
              </span>

            </div>


            <h2 className="text-2xl font-bold mb-5 line-clamp-2 text-gray-900 tracking-tight">
              {item.qname}
            </h2>


            <div className="space-y-2 text-gray-400 text-sm">

              <p>
                Draft ID
              </p>

              <p className="font-mono text-gray-500 break-all">
                {item.qid}
              </p>

            </div>


            <Link to={`/studio?id=${item.qid}`}>
              <button
                className="mt-8 w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 cursor-pointer"
              >
                Continue Editing
              </button>
            </Link>

          </div>

        ))}

      </div>

    ) : (

      <div className="flex flex-col items-center justify-center h-[55vh] text-center">

        <div className="border border-gray-200 bg-white rounded-2xl px-12 py-10 shadow-sm">

          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            No Drafts Yet
          </h2>

          <p className="text-gray-400 max-w-md leading-relaxed">
            Your saved polls and quizzes will appear here. Create your first questionnaire and pick up where you left off anytime.
          </p>

          <Link to={'/studio'}>
            <button
              className="mt-8 px-8 py-3.5 bg-gray-900 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 cursor-pointer"
            >
              Visit Studio
            </button>
          </Link>

        </div>

      </div>

    )}

  </div>
</div>
  )
}

export default drafts

