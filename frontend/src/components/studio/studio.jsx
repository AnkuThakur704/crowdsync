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
        <div className="h-full w-full min-h-screen bg-white text-gray-900 flex items-center justify-center px-6 relative overflow-hidden pt-20 z-0">

    {isloading ? <Loadinganim /> : <>

        {component === "none" ? <div className="relative w-full max-w-2xl min-h-[380px] bg-white border border-gray-200 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center gap-8 shadow-xl shadow-indigo-100/40">

            <Quicknav />

            {/* subtle background glow */}

            <div className="absolute w-72 h-72 bg-indigo-100/50 blur-3xl rounded-full -top-32 -right-32 pointer-events-none"></div>

            <div className="absolute w-64 h-64 bg-violet-100/40 blur-3xl rounded-full -bottom-32 -left-32 pointer-events-none"></div>


            <div className="relative z-10 text-center">
                <p className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-gray-900">
                    What do you want to host today?
                </p>

            </div>


            <input
                onChange={(e) => setqname(e.target.value)}
                type="text"
                placeholder="Name your questionnaire"
                className="relative z-10 px-5 py-3.5 w-full max-w-lg bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition"
                required
                spellCheck={false}
            />


            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full max-w-lg">

                <button
                    type="button"
                    onClick={loadpoll}
                    className="flex-1 px-5 py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 transition-all duration-300 cursor-pointer"
                >
                    Create a poll
                </button>

                <button
                    type="button"
                    onClick={loadquiz}
                    className="flex-1 px-5 py-3.5 bg-white text-gray-700 rounded-xl border border-gray-200 font-semibold hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
                >
                    Create a quiz
                </button>

            </div>

        </div> : <div>{component === "poll" ? <Poll qname={qname} qidofdraft={qid} /> : <div><Quiz qname={qname} qidofdraft={qid} /></div>}</div>}

    </>}

</div>
    )
}

export default studio
