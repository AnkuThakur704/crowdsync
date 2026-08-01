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
    <div className="bg-black/70 backdrop-blur-sm z-10 fixed top-0 right-0 w-full h-20 border border-amber-200 flex items-center mx-auto justify-around">
      <Link to={'/'}><p className="text-white text-3xl poppins-semibold">CrowdSync</p></Link>
      {loggedin?<div className="flex items-center gap-5">
      <p className="text-amber-300">{userdata.email}</p>
      <button onClick={handlelogout} className="border border-red-500 text-white text-sm px-2 py-1 hover:cursor-pointer hover:border-black transition duration-400">Logout</button></div>:<div className=" w-50 flex items-center justify-around">
        <Link to={'/signup'}> <button  className="text-[#2b2b2b] text-sm p-2  hover:cursor-pointer hover:bg-amber-200 bg-amber-300">Sign up</button></Link>
      <Link to={'/login'}><button className="text-amber-300 text-sm p-2  hover:cursor-pointer hover:border hover:border-amber-300 bg-[#2b2b2b]">Login</button></Link>
      </div>}
    </div>
  )
}

export default navbar
