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
  <div className="min-h-screen bg-white flex items-center justify-center text-gray-900 px-6 relative overflow-hidden pt-20">

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
                Make every
                <br />
                voice <span className="text-indigo-600">count.</span>
              </h1>


              <p className="text-gray-500 mt-7 text-lg leading-relaxed max-w-md">
                Create polls, host quizzes, engage audiences, and
                visualize live responses in real time.
              </p>


              <div className="mt-12 space-y-7">


                {/* Feature 1 */}

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    1
                  </div>

                  <div>
                    <p className="font-semibold text-base text-gray-900">
                      Create Live Polls
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      Launch interactive polls instantly.
                    </p>
                  </div>

                </div>


                {/* Feature 2 */}

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 font-bold">
                    2
                  </div>

                  <div>
                    <p className="font-semibold text-base text-gray-900">
                      Host Real-Time Quizzes
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      Engage audiences with competition.
                    </p>
                  </div>

                </div>


                {/* Feature 3 */}

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold">
                    3
                  </div>

                  <div>
                    <p className="font-semibold text-base text-gray-900">
                      Analyze Audience Insights
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      Track trends with live analytics.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>


          {/* Right side */}

          <div className="p-10 md:p-14 flex flex-col justify-center">

            <div className="mb-9">

              <p className="text-sm font-semibold text-indigo-600 mb-3">
                Get started
              </p>

              <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-gray-900">
                Create Account
              </h2>

              <p className="text-gray-400 mt-3">
                Start building interactive live experiences.
              </p>

            </div>


            <form className="space-y-5" onSubmit={handlesubmit}>


              {/* Full Name */}

              <div>

                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Full Name
                </label>

                <input
                  onChange={(e)=>setformdata({...formdata,name:e.target.value})}
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none rounded-xl px-5 py-3.5 text-gray-900 placeholder:text-gray-400 transition duration-200"
                />

              </div>


              {/* Email */}

              <div>

                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email Address
                </label>

                <input
                  onChange={(e)=>setformdata({...formdata,email:e.target.value})}
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none rounded-xl px-5 py-3.5 text-gray-900 placeholder:text-gray-400 transition duration-200"
                />

              </div>


              {/* Password */}

              <div>

                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Password
                </label>

                <input
                  onChange={(e)=>setformdata({...formdata,password:e.target.value})}
                  type="password"
                  placeholder="Create a password"
                  required
                  className="w-full bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none rounded-xl px-5 py-3.5 text-gray-900 placeholder:text-gray-400 transition duration-200"
                />

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-xl transition duration-300 shadow-lg shadow-gray-900/10 hover:shadow-indigo-600/20 cursor-pointer"
              >
                Create Account
              </button>

            </form>


            <p className="text-gray-400 text-sm text-center mt-7">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>
    )}

  </div>
</>
  );
}