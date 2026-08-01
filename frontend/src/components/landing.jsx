import LivePollDemo from "./demopoll"
import { useState ,useEffect} from "react"
import { Link,useNavigate } from "react-router"
import LoadingAnim from "./loadingAnim"
const url = import.meta.env.VITE_BACKEND_URL

const landing = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(true)
  const onloading = async()=>{
    const r = await fetch(`${url}/routes/verifyloggedin`,{method:"POST",
      credentials:"include",
    })
    if(r.status===200) navigate('/dashboard')
  }
  useEffect(() => {
    onloading()
    setTimeout(()=>{
      setloading(false)
    },1500)

  }, [])
  
  return (
    <>
    {/* <div className="bg-[#2b2b2b] h-screen w-full poppins-black">

    </div> */}

     <div className="bg-[#1f1f1f]  text-white min-h-screen overflow-x-hidden pt-20">

      {loading?<div className="w-screen h-screen flex items-center justify-center"><LoadingAnim/></div>:<div>
        <section className="min-h-screen flex flex-col z-0 justify-center items-center px-6 text-center relative">
        
        <div className="absolute w-96 h-96 bg-amber-300/10 blur-3xl rounded-full top-40 left-10"></div>
        <div className="absolute w-96 h-96 bg-yellow-500/10 blur-3xl rounded-full bottom-10 right-10"></div>

        <div className="z-10 max-w-5xl pt-7">
          <h1 className="text-6xl md:text-7xl font-black leading-tight">
            Turn Your
            <span className="text-amber-300"> Audience </span>
            Into
            <br />
            Live Interaction
          </h1>

          <p className="text-gray-300 mt-8 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Create engaging live polls and quizzes with real-time results,
            audience participation, and beautiful analytics — all in one place.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <Link to={'/signup'}><button className="bg-amber-300 hover:bg-amber-200 text-[#2b2b2b] font-semibold px-8 py-4 rounded-2xl transition text-lg shadow-lg shadow-amber-300/20">
              Start Now
            </button></Link>

            <button className="border border-amber-300 hover:bg-amber-300 hover:text-[#2b2b2b] text-amber-300 font-semibold px-8 py-4 rounded-2xl transition text-lg">
              Watch Demo
            </button>
          </div>
        </div>

        <LivePollDemo/>
        
      </section>

      
      <section className="py-32 px-6 bg-[#242424]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <p className="text-amber-300 uppercase tracking-[0.3em] text-sm mb-5">
              Features
            </p>

            <h2 className="text-5xl font-bold">
              Everything Needed For
              <span className="text-amber-300"> Live Engagement</span>
            </h2>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Polling",
                desc: "Watch audience responses update instantly during events and sessions.",
              },
              {
                title: "Interactive Quizzes",
                desc: "Host live quizzes with instant participation and engagement.",
              },
              {
                title: "Live Analytics",
                desc: "Beautiful graphs and trends displayed in real time.",
              },
              {
                title: "Leaderboard System",
                desc: "Increase competition with dynamic live rankings.",
              },
              {
                title: "Mobile Friendly",
                desc: "Optimized for every screen size and device.",
              },
              {
                title: "Instant Setup",
                desc: "Create and launch polls or quizzes within seconds.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#2b2b2b] border border-amber-200/10 hover:border-amber-300/40 transition rounded-3xl p-8 hover:-translate-y-2 duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-300 flex items-center justify-center text-[#2b2b2b] text-2xl font-bold mb-6">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-32 px-6 z-0">
        <div className="max-w-6xl mx-auto text-center">
          
          <p className="text-amber-300 uppercase tracking-[0.3em] text-sm mb-5">
            How It Works
          </p>

          <h2 className="text-5xl font-bold mb-20">
            Launch Polls In
            <span className="text-amber-300"> Seconds</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10 z-0">
            {[
              {
                step: "01",
                title: "Create",
                desc: "Add your questions and options instantly.",
              },
              {
                step: "02",
                title: "Share",
                desc: "Send the room code or display the QR code to audience.",
              },
              {
                step: "03",
                title: "Engage",
                desc: "Watch live responses and audience interaction.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-[#2b2b2b] z-0 border border-amber-200/10 rounded-3xl p-10"
              >
                <p className="text-7xl font-black text-amber-300/20 absolute top-5 right-6">
                  {item.step}
                </p>

                <h3 className="text-3xl font-bold mb-4 relative z-10">
                  {item.title}
                </h3>

                <p className="text-gray-400 relative z-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-32 px-6 bg-[#242424]">
        <div className="max-w-5xl mx-auto text-center">
          
        

          <h2 className="text-6xl font-black leading-tight">
            Ready To
            <span className="text-amber-300"> CrowdSync </span>
            Your Audience?
          </h2>

          <p className="text-gray-400 mt-8 text-xl max-w-3xl mx-auto">
            Create live polls and quizzes that people actually enjoy interacting
            with.
          </p>

          <button className="mt-12 bg-amber-300 hover:bg-amber-200 text-[#2b2b2b] font-bold px-10 py-5 rounded-2xl text-xl transition shadow-lg shadow-amber-300/20">
            Get Started Now
          </button>
        </div>
      </section>
      </div>}

    </div>
    </>
  )
}

export default landing
