import { Link, useNavigate } from "react-router";
import { useState,useEffect } from "react";
import LoadingAnim from "./loadingAnim"
import { ToastContainer, toast } from 'react-toastify';

const url = import.meta.env.VITE_BACKEND_URL
export default function SignupPage() {
    const [loading, setloading] = useState(false)
    const [formdata, setformdata] = useState({name:"", email:"",password:""})
    const navigate = useNavigate()
    const loadingScreen = ()=>{
        setTimeout(()=>{
            setloading(false)
        },1500)
    }
    useEffect(() => {
      loadingScreen()
    }, [])


    const handlesubmit = async(e)=>{
        e.preventDefault()
        const r = await fetch(`${url}/auth/signup`,{method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name: formdata.name,
                email: formdata.email,
                password: formdata.password
            })
        })
        const data  = await r.json()
        console.log("response: ",data)
        if(data.success){
          navigate('/login')
        }
        else{
          notify()
        }
    }

    const notify = () =>toast.error('Error Signing up. May be from our side or the account already exists', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});

    
  return (
    <>

    <div className="min-h-screen bg-[#1f1f1f] flex items-center justify-center text-white px-6 relative overflow-hidden pt-20">
      
      <ToastContainer />
      {loading?<div><LoadingAnim/> </div>:<div>
        <div className="absolute w-125 h-125 bg-amber-300/10 blur-3xl rounded-full -top-40 -left-40"></div>

      <div className="absolute w-125 h-125 bg-yellow-500/10 blur-3xl rounded-full bottom-0 right-0"></div>

      
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-[#2b2b2b]/80 backdrop-blur-xl border border-amber-200/10 rounded-[40px] overflow-hidden shadow-2xl shadow-black/50 z-10">
        
        
        <div className="hidden lg:flex flex-col justify-center p-16 border-r border-amber-200/10 relative">
          
          <div className="absolute inset-0 bg-linear-to-br from-amber-300/5 to-transparent"></div>

          <div className="relative z-10">
            <h1 className="text-6xl font-black leading-tight text-white">
              Sign up quickly
            </h1>

            <p className="text-white mt-8 text-lg leading-relaxed max-w-md">
              Create polls, host quizzes, engage audiences, and
              visualize live responses in real time.
            </p>

            
            <div className="mt-14 space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12  border border-amber-400 flex items-center justify-center  font-bold">
                  1
                </div>

                <div>
                  <p className="font-semibold text-lg ">
                    Create Live Polls
                  </p>

                  <p className="text-gray-400 text-sm">
                    Launch interactive polls instantly.
                  </p>
                </div>
              </div>

              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-amber-400  flex items-center justify-center  font-bold">
                  2
                </div>

                <div>
                  <p className="font-semibold text-lg">
                    Host Real-Time Quizzes
                  </p>

                  <p className="text-gray-400 text-sm">
                    Engage audiences with competition.
                  </p>
                </div>
              </div>

              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-amber-400 flex items-center justify-center  font-bold">
                  3
                </div>

                <div>
                  <p className="font-semibold text-lg">
                    Analyze Audience Insights
                  </p>

                  <p className="text-gray-400 text-sm">
                    Track trends with live analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        
        <div className="p-10 md:p-14 flex flex-col justify-center">
          
          <div className="mb-10">
            <h2 className="text-4xl font-black">
              Create Account
            </h2>

            <p className="text-gray-400 mt-3">
              Start building interactive live experiences.
            </p>
          </div>

          
          <form className="space-y-6" onSubmit={handlesubmit}>
            
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Full Name
              </label>

              <input
                onChange={(e)=>setformdata({...formdata,name:e.target.value})}
                type="text"
                placeholder="Enter your name"
                required
                className="w-full bg-[#1f1f1f] border border-amber-200/10 focus:border-amber-300 outline-none rounded-2xl px-5 py-4 text-white transition"
              />
            </div>

            
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Email Address
              </label>

              <input
              onChange={(e)=>setformdata({...formdata,email:e.target.value})}
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-[#1f1f1f] border border-amber-200/10 focus:border-amber-300 outline-none rounded-2xl px-5 py-4 text-white transition"
              />
            </div>

            
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Password
              </label>

              <input
              onChange={(e)=>setformdata({...formdata,password:e.target.value})}
                type="password"
                placeholder="Create a password"
                required
                className="w-full bg-[#1f1f1f] border border-amber-200/10 focus:border-amber-300 outline-none rounded-2xl px-5 py-4 text-white transition"
              />
            </div>

            
            <button
              type="submit"
              className="w-full bg-amber-300 hover:bg-amber-200 text-[#2b2b2b] font-bold py-4 rounded-2xl transition duration-300 shadow-lg shadow-amber-300/20"
            >
              Create Account
            </button>
          </form>

          <p className="text-gray-400 text-center mt-8">
            Already have an account?{" "} 
            
            <Link
              to="/login"
              className="text-amber-300 hover:text-amber-200 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      </div>}
    </div></>
  );
}