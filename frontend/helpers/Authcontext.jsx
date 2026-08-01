import { Children, createContext, useContext, useState } from "react";

const Authcontext = createContext()

export const Authprovider = ({children})=>{
    const [loggedin, setloggedin] = useState(false)
    const [userdata, setuserdata] = useState({name:"user", email:"user@gmail.com"})
    return(
        <Authcontext.Provider  value={{
            loggedin, setloggedin, userdata, setuserdata
        
        }}>{children}</Authcontext.Provider>
    )
}

export const useAuth = ()=> useContext(Authcontext)