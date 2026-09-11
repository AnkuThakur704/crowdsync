import { Link ,useNavigate} from "react-router"
import { useState,useEffect } from "react"
import LoadingAnim from "./loadingAnim"
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../../helpers/Authcontext";
import notify from "./toast";

const url = import.meta.env.VITE_BACKEND_URL
const login = () => {
  const {setloggedin, setuserdata} = useAuth()
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)  //change this later
    const [formdata, setformdata] = useState({
        email:"",
        password:""
    })
    const loadingScreen = ()=>{
            setTimeout(()=>{
                setloading(false)
            },1500)
        }
        useEffect(() => {
          loadingScreen()
        }, [])
    const handlesubmit = async (e)=>{
        e.preventDefault()
        console.log("login form data: ", formdata)
        const r = await fetch(`${url}/auth/login`,{method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email: formdata.email,
                password: formdata.password
            })
        })
        const data = await r.json()
        console.log("data from login: ", data)
        if(data.success){
          console.log("data from login: ", data)
          setloggedin(true)
          // setuserdata({
          //   name:formdata.name,
          //   email: formdata.email
          // })
          navigate('/dashboard')
        }
        else{
          notify('Invalid email or password')
        }
    }
  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-6 relative overflow-hidden pt-20 z-0">

  <ToastContainer />

  {loading ? (
    <div>
      <LoadingAnim />
    </div>
  ) : (
    <div>

      {/* Background decoration */}

      <div className="absolute w-[500px] h-[500px] bg-indigo-100/60 blur-3xl rounded-full -top-40 -left-40"></div>

      <div className="absolute w-[500px] h-[500px] bg-violet-100/50 blur-3xl rounded-full bottom-0 right-0"></div>


      {/* Main container */}

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-2xl shadow-gray-900/10 z-10">


        {/* Left side */}

        <div className="hidden lg:flex flex-col justify-center p-16 border-r border-gray-100 relative">

          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 via-white to-transparent"></div>

          <div className="relative z-10">

            <div className="mb-8">

              <p className="text-sm font-bold tracking-tight text-gray-900">
                Crowd<span className="text-indigo-600">Sync</span>
              </p>

              <div className="w-10 h-1 bg-indigo-600 rounded-full mt-3"></div>

            </div>


            <h1 className="text-5xl font-extrabold tracking-[-0.04em] leading-[1.05] text-gray-900">
              Welcome
              <br />
              <span className="text-indigo-600">back.</span>
            </h1>


            <p className="text-gray-500 mt-7 text-lg leading-relaxed max-w-md">
              Continue creating live polls, hosting quizzes,
              and analyzing audience engagement in real time.
            </p>


            {/* Existing feature section remains untouched */}

            {/* <div className="mt-14 space-y-6">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 border border-white bg-amber-300 flex items-center justify-center font-bold text-[#2b2b2b]">
                  1
                </div>

                <div>
                  <p className="font-semibold text-lg">
                    Resume Live Sessions
                  </p>

                  <p className="text-gray-400 text-sm">
                    Pick up right where your audience left off.
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-4">

                <div className="w-12 h-12 border border-white bg-amber-300 flex items-center justify-center font-bold text-[#2b2b2b]">
                  2
                </div>

                <div>
                  <p className="font-semibold text-lg">
                    Monitor Real-Time Responses
                  </p>

                  <p className="text-gray-400 text-sm">
                    Track votes and reactions instantly.
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-4">

                <div className="w-12 h-12 border border-white bg-amber-300 flex items-center justify-center font-bold text-[#2b2b2b]">
                  3
                </div>

                <div>
                  <p className="font-semibold text-lg">
                    Access Audience Analytics
                  </p>

                  <p className="text-gray-400 text-sm">
                    Understand trends with visual insights.
                  </p>
                </div>
              </div>

            </div> */}

          </div>
        </div>


        {/* Right side */}

        <div className="p-10 md:p-14 flex flex-col justify-center">

          <div className="mb-9">

            <p className="text-sm font-semibold text-indigo-600 mb-3">
              Welcome back
            </p>

            <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-gray-900">
              Login
            </h2>

            <p className="text-gray-400 mt-3">
              Access your CrowdSync dashboard.
            </p>

          </div>


          <form className="space-y-5" onSubmit={handlesubmit}>


            {/* Email */}

            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e)=>setformdata({...formdata,email:e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none rounded-xl px-5 py-3.5 text-gray-900 placeholder:text-gray-400 transition duration-200"
              />

            </div>


            {/* Password */}

            <div>

              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e)=>setformdata({...formdata,password:e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none rounded-xl px-5 py-3.5 text-gray-900 placeholder:text-gray-400 transition duration-200"
              />

            </div>


            {/* Forgot password */}

            <div className="flex items-center justify-between text-sm">

              <button
                type="button"
                className="text-gray-500 hover:text-indigo-600 font-medium transition cursor-pointer"
              >
                Forgot Password?
              </button>

            </div>


            {/* Login button */}

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-semibold px-4 py-3.5 rounded-xl cursor-pointer transition duration-300 shadow-lg shadow-gray-900/10 hover:shadow-indigo-600/20"
            >
              Login
            </button>

          </form>


          <p className="text-gray-400 text-sm text-center mt-7">

            Don&apos;t have an account?{" "}

            <Link
              to="/signup"
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  )}

</div>
  )
}


export default login
