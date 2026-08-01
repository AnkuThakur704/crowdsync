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
    <div className="min-h-screen bg-[#1f1f1f] text-white flex items-center justify-center px-6 relative overflow-hidden pt-20 z-0">
      <ToastContainer />
    {loading?<div><LoadingAnim/> </div>:<div>

  <div className="absolute w-125 h-125 bg-amber-300/10 blur-3xl rounded-full -top-40 -left-40"></div>

  <div className="absolute w-125 h-125 bg-yellow-500/10 blur-3xl rounded-full bottom-0 right-0"></div>

  <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-[#2b2b2b]/80 backdrop-blur-xl border border-white overflow-hidden shadow-2xl shadow-black/50 z-10">

    
    <div className="hidden lg:flex flex-col justify-center p-16 border-r border-amber-200/10 relative">

      <div className="absolute inset-0 bg-linear-to-br from-amber-300/5 to-transparent"></div>

      <div className="relative z-10">
        <h1 className="text-6xl font-black leading-tight text-white">
          Welcome
          <span className="text-amber-300"> Back </span>
        </h1>

        <p className="text-white mt-8 text-lg leading-relaxed max-w-md">
          Continue creating live polls, hosting quizzes,
          and analyzing audience engagement in real time.
        </p>

        
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

    
    <div className="p-10 md:p-14 flex flex-col justify-center">

      <div className="mb-10">

        <h2 className="text-4xl font-black">
          Login
        </h2>

        <p className="text-gray-400 mt-3">
          Access your CrowdSync dashboard.
        </p>
      </div>

      
      <form className="space-y-6" onSubmit={handlesubmit}>

        
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e)=>setformdata({...formdata,email:e.target.value})}
            className="w-full bg-[#1f1f1f] border border-amber-200/10 focus:border-amber-300 outline-none  px-5 py-4 text-white transition"
          />
        </div>

        
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e)=>setformdata({...formdata,password:e.target.value})}
            className="w-full bg-[#1f1f1f] border border-amber-200/10 focus:border-amber-300 outline-none  px-5 py-4 text-white transition"
          />
        </div>

        
        <div className="flex items-center justify-between text-sm">

          <button
            type="button"
            className="text-amber-300 hover:text-amber-200 transition"
          >
            Forgot Password?
          </button>

        </div>

        
        <button
          type="submit"
          className="w-full border border-amber-400 text-white  px-4 py-3 hover:cursor-pointer hover:border-[#2a2a2a] transition duration-400 hover:text-amber-400">
          Login
        </button>

      </form>

      <p className="text-gray-400 text-center mt-8">
        Don&apos;t have an account?{" "}

        <Link
          to="/signup"
          className="text-amber-300 hover:text-amber-200 transition"
        >
          Create Account
        </Link>

      </p>

    </div>
  </div>
</div>}
    </div>
  )
}


export default login
