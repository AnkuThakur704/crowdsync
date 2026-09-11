import "@fontsource/poppins/600.css"
import {Link, useNavigate} from 'react-router'
import { useEffect, useState } from "react"
import { useAuth } from "../../helpers/Authcontext"

const url  =  import.meta.env.VITE_BACKEND_URL 
const navbar = () => {
  const navigate = useNavigate()
  const {loggedin, setloggedin, userdata, setuserdata} = useAuth()
  const onreload = async ()=>{
    const r = await fetch(`${url}/routes/verifyloggedin`,{method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      }
    })
    console.log("status:",r.status)
    const data = await r.json()
    if(r.status ===200){
      setuserdata({name:data.userdata.name, email: data.userdata.email})
      console.log("setuserdata:", userdata)
      setloggedin(true)
    }
  }

  const handlelogout = async()=>{
    const r = await fetch(`${url}/auth/logout`,{method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    if(r.status==200){
      console.log("loggedout")
      setloggedin(false)
      setuserdata({name:"user", email:"user@gmail.com"})
      navigate('/login')
    }
  }

  useEffect(() => {
    onreload()
  }, [loggedin])
  
  
  return (
    <div className="fixed top-0 right-0 z-10 w-full h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/70 flex items-center justify-around px-6">

  <Link to={'/'}>
    <p className="text-gray-900 text-2xl font-extrabold tracking-tight hover:text-indigo-600 transition duration-300">
      Crowd<span className="text-indigo-600">Sync</span>
    </p>
  </Link>

  {loggedin ? (
    <div className="flex items-center gap-5">

      <p className="text-sm font-medium text-gray-500">
        {userdata.email}
      </p>

      <button
        onClick={handlelogout}
        className="border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg hover:text-red-600 hover:border-red-200 hover:bg-red-50 cursor-pointer transition duration-300"
      >
        Logout
      </button>

    </div>
  ) : (
    <div className="flex items-center gap-3">

      <Link to={'/signup'}>
        <button
          className="text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-lg hover:text-gray-900 hover:bg-gray-100 cursor-pointer transition duration-300"
        >
          Sign up
        </button>
      </Link>

      <Link to={'/login'}>
        <button
          className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-indigo-600 shadow-sm hover:shadow-indigo-600/20 cursor-pointer transition duration-300"
        >
          Login
        </button>
      </Link>

    </div>
  )}
</div>
  )
}

export default navbar
