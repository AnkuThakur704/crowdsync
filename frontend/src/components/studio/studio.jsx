import Poll from "./poll"
import Quiz from "./quiz"
import Loadinganim from "../loadingAnim"
import { useState, useEffect } from "react"
import Quicknav from "../smallcompo/quicknav"

const backend_url = import.meta.env.VITE_BACKEND_URL
const studio = () => {
    const [component, setcomponent] = useState("none")
    const [isloading, setisloading] = useState(false)
    const [qname, setqname] = useState("")
    const [qid, setqid] = useState()
    const [editdraft, seteditdraft] = useState(false)
    const loadpoll = () => {
        if (qname.trim() != "") {
            // setisloading(true)
            // setTimeout(() => {
            //     setisloading(false)
            // }, 2000);
            setcomponent("poll")
        }
    }
    const loadquiz = () => {
        if (qname.trim() != "") {
            setisloading(true)
            setTimeout(() => {
                setisloading(false)
            }, 2000);
            setcomponent("quiz")
        }
    }

    const onreload = async()=>{
        if(qid){
            console.log("ther is qid")
            seteditdraft(true)
            const r = await fetch(`${backend_url}/routes/getqtype`,{method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    qid: qid
                })
            })
            const data =await r.text()
            console.log(typeof data)
            setcomponent(data)
        } 
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")
        setqid(id)
        onreload()
    }, [qid])
    // useEffect(() => {
    //     console.log("qid:", qid)
    // }, [qid])


    return (
        <div className="h-full w-full min-h-screen bg-[#1f1f1f] text-white flex items-center justify-center px-6 relative overflow-hidden pt-20 z-0">
            {isloading ? <Loadinganim /> : <>{component === "none" ? <div className="w-150 h-80 border border-white/20 bg-white/10 p-5 flex flex-col items-center gap-10 pt-15">
            <Quicknav/>
                <p className="text-2xl text-amber-300">What do you want to host today?</p>

                <input onChange={(e) => setqname(e.target.value)} type="text" placeholder="Name your questionnaire" className="px-5 py-2 w-100 focus:outline-none border border-white focus:border-amber-300" required spellCheck={false} />
                <div className="flex gap-20">
                    <button type="button" onClick={loadpoll} className="px-5 py-3 border border-white/20 text-sm hover:border-amber-300">
                        Create a poll
                    </button>
                    <button type="button" onClick={loadquiz} className="px-5 py-3 border border-white/20 text-sm hover:border-amber-300">
                        Create a quiz
                    </button>
                </div>
            </div> : <div>{component === "poll" ? <Poll qname={qname} qidofdraft={qid} /> : <div><Quiz qname={qname} qidofdraft={qid} /></div>}</div>}</>}

        </div>
    )
}

export default studio
