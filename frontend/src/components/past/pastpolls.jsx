import Quicknav from '../smallcompo/quicknav'
import { useAuth } from '../../../helpers/Authcontext'
import { useState , useEffect} from "react"
import givelastupdated from '../../../helpers/getdate'
import { Link } from "react-router" 
const backend_url = import.meta.env.VITE_BACKEND_URL

const pastpolls = () => {

  const {userdata} =  useAuth() 
  const [allpastpolls, setallpastpolls] = useState([])
  // setauthor(userdata.email)
  const getpastpolls = async()=>{
    let data = await fetch(`${backend_url}/routes/getpastpolls?author=${userdata.email}`)
    data  = await data.json()
    console.log("pastpolls: ", data)
    setallpastpolls(data.pastpolls)
  }
//  getpastpolls()    this was causing a reload loop
  // console.log("all: ", allpastpolls)
  useEffect(() => {
    getpastpolls()
  }, [userdata])

  useEffect(() => {
    console.log("page reloaded: ", allpastpolls)
  }, [allpastpolls])
  

  
  
  
  return (
    <div className="min-h-screen bg-white text-gray-900 px-8 pt-24 pb-10">
  <div className="max-w-7xl mx-auto">
    <Quicknav />

    <div className="mb-12">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
        Past Polls
      </h1>

      <p className="text-gray-400 mt-3 text-lg">
        View previously hosted polls and their results.
      </p>
    </div>

    {allpastpolls.length !== 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {allpastpolls.map((poll, key) => (
          <div
            key={key}
            className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/40"
          >

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">

                <span className="px-3 py-1 rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600 text-sm font-medium">
                  Instance {poll.instance}
                </span>

              </div>
            </div>


            <h2 className="text-2xl font-bold mb-5 line-clamp-2 text-gray-900">
              {poll.qname}
            </h2>


            <div className="space-y-4 text-sm">

              <div>
                <p className="text-gray-400">
                  Poll ID
                </p>

                <p className="font-mono text-gray-600 break-all mt-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  {poll.qid}
                </p>
              </div>


              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-400">
                  Hosted
                </span>

                <span className="text-gray-600">
                  {givelastupdated(new Date(poll.updatedAt))}
                </span>
              </div>

            </div>


            <Link to={`/viewpastpoll?qid=${poll.qid}&instance=${poll.instance}`}>
              <button
                className="mt-8 w-full py-3 bg-gray-900 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 hover:cursor-pointer"
              >
                View Stats
              </button>
            </Link>

          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-[55vh] text-center">

        <div className="border border-gray-200 bg-white rounded-3xl shadow-sm px-12 py-10">

          <h2 className="text-3xl font-bold mb-3 text-gray-900">
            No Polls Hosted Yet
          </h2>

          <p className="text-gray-400 max-w-md">
            Your previously hosted polls will appear here along with
            their hosting instances and results.
          </p>

        </div>

      </div>
    )}
  </div>
</div>
  )
}

export default pastpolls
