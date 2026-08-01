import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router"
import {useAuth} from "../../helpers/Authcontext"
import Quicknav from "./smallcompo/quicknav"

const url = import.meta.env.VITE_BACKEND_URL
const dashboard = () => {
  const {userdata} = useAuth()
  console.log("userdata:",userdata)
    const navigate = useNavigate()
    const onReload = async ()=>{
        const r = await fetch(`${url}/routes/dashboard`,{method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await r.json()
        console.log("dashdata: ", data)
        if(r.status===401){
            navigate('/login')
        }
    }


    useEffect(() => {
      // onReload()
    }, [])

    return(
      <>
      <div className="h-full w-full min-h-screen bg-[#1f1f1f] text-white flex items-center justify-center px-6 relative overflow-hidden pt-20 z-0">
        <Quicknav/>
        <div className="text-4xl">Welcome, {userdata.name}</div>
        <div className="flex flex-col items-center absolute bottom-30 right-10">
          <Link to={'/studio'}> 
          <button className="bg-black/70 w-50 backdrop-blur-sm border border-amber-200 p-3 hover:cursor-pointer hover:bg-amber-200 hover:text-black transform duration-500">Create</button>
           </Link>
           <Link to={'/joinques'}> 
          <button  className= " bg-black/70 w-50 backdrop-blur-sm border border-amber-200 p-3 hover:cursor-pointer hover:bg-amber-200 hover:text-black transform duration-500">Join</button>
           </Link>
        </div>
      </div>        

      </>
    )
  }

  export default dashboard
