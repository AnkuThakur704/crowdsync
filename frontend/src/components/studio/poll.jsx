import { useState,useEffect } from "react"
import {useAuth} from '../../../helpers/Authcontext'
import {Link, useNavigate} from "react-router"
import Quicknav from '../smallcompo/quicknav'
import { golive } from "../helpers"

const backend_url = import.meta.env.VITE_BACKEND_URL
const qid = crypto.randomUUID()

const poll = ({qname,qidofdraft}) => {
    const navigate = useNavigate()
    const {userdata} = useAuth()
    const [pollname, setpollname] = useState(qname)
    console.log("qid from params:",qidofdraft)  
    const [pages, setpages] = useState([{
        id: 1,
        statement: "How's your day been?",
        options: [{text:"Good", votes: 0}, {text:"Amazing", votes:0}]
    }])
    const [selectedpage, setselectedpage] = useState(pages.length - 1)
    
    const savepage = async(e) => {
        e.preventDefault()
        console.log("pages: ", pages, selectedpage)
        const r = await fetch(`${backend_url}/routes/savepage`,{method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                qid: qidofdraft?qidofdraft:qid,
                type: "poll",
                qname:pollname,
                author: userdata.email,
                pages: pages
            })
        })
    }

    const onreload = async()=>{
        if(qidofdraft){
            const r = await fetch(`${backend_url}/routes/getdraftdata`,{method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    qid: qidofdraft
                })
            })
            const data = await r.json()
            console.log("drfat data: ",data)
            setpollname(data.qname)
            setpages(data.pages)
        }
    }


    useEffect(() => {
      onreload()
    }, [])
    
    return (
        <div className="h-full w-full  bg-[#1f1f1f] text-white flex flex-col items-center justify-center px-3 relative overflow-hidden pt-0 z-0">
            <Quicknav/>
            <p className="text-green-300">{pollname}</p>
            <div className="w-full h-full pt-3 flex items-center gap-5">
                <div className="h-[80vh] w-[20vw] border border-white flex flex-col items-center p-2 overflow-y-auto overflow-x-hidden gap-2">

                    {pages.map((item, key) =>
                        <button onClick={(e) => setselectedpage(key)} className="w-[16vw] h-20 text-sm  text-white/80 flex items-center justify-center hover:cursor-pointer bg-white/10 border border-white/10 shrink-0">Page {item.id}</button>)}

                    <button onClick={(e) => {setpages([...pages, {
                        id: pages.length + 1,
                        statement: "How's your day been?",
                        options: [{text:"Good", votes: 0}, {text:"Amazing", votes:0}]
                    }]); setselectedpage(pages.length)}} className="absolute bottom-10 left-64 w-[4vw] h-10   z-10 text-white border border-zinc-300 bg-zinc-900 mt-5 hover:cursor-pointer text-center text-2xl font-extrabold">+</button>
                </div>      
                <div className="h-[80vh] w-[50vw] bg-zinc-900 border border-white/20 flex flex-col items-start pl-10 justify-around">
                    <p className="text-4xl">{pages[selectedpage].statement}</p>
                    <div className="flex flex-col items-start gap-7">
                        {pages[selectedpage].options.map((option, key) =>
                            <p className="text-xl border px-5 py-3 border-amber-200 hover:cursor-pointer">{option.text}</p>)}
                    </div>
                </div>
                <div className="w-[20vw] h-100 border border-amber-300 p-3 overflow-y-auto">
                    <form className="flex flex-col items-start gap-10 w-full">
                        <div className="flex flex-col items-start gap-5 w-full">
                            <label htmlFor="statement" className="text-green-300">Poll Statement</label>
                            <textarea
                                value={pages[selectedpage].statement}
                                rows={1}
                                onChange={(e) =>
                                    setpages(
                                        pages.map((page, index) =>
                                            index === selectedpage
                                                ? { ...page, statement: e.target.value }
                                                : page
                                        )
                                    )
                                }
                                placeholder="Eg. How was your day?"
                                className="statement w-full resize-none overflow-hidden focus:outline-none focus:text-gray-300"
                                onInput={(e) => {
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                            />
                        </div>
                        <div className="flex flex-col items-start gap-5">
                            <label htmlFor="options" className="text-green-300">Options</label>
                            <div>
                                {pages[selectedpage].options.map((item, key) =>
                                    <textarea
                                        value={item.text}
                                        rows={1}
                                        onChange={(e) =>
                                            setpages(
                                                pages.map((page, pageIndex) =>
                                                    pageIndex === selectedpage
                                                        ? {
                                                            ...page,
                                                            options: page.options.map((option, optionIndex) =>
                                                                optionIndex === key ? {text:e.target.value, votes:0} : option
                                                            )
                                                        }
                                                        : page
                                                )
                                            )
                                        }
                                        placeholder="Great"
                                        className="statement w-full resize-none overflow-hidden focus:outline-none focus:text-gray-300 border border-green-200 p-2"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = `${e.target.scrollHeight}px`;
                                        }}
                                    />
                                )}
                                <button type="button" onClick={(e) => setpages(pages.map((page, pageIndex) =>
                                    pageIndex === selectedpage
                                        ? {
                                            ...page,
                                            options: [...page.options, {text:"write something here", votes:0}]
                                        }
                                        : page
                                ))} className="statement w-full resize-none overflow-hidden focus:outline-none focus:text-gray-300 border border-green-200 p-2">Add Option</button>

                            </div>
                        </div>
                        {/* <input type="text" placeholder="Eg. What game do you like the most" className="focus:outline-none focus:text-gray-300" /> */}
                        <button onClick={savepage}>Save page</button>
                    </form>
                </div>
                <button onClick={(e)=>golive(navigate, qidofdraft?qidofdraft:qid)}>Go Live</button>
                    {/* <Link to={`/hostques?id=${qidofdraft?qidofdraft:qid}`}> <button>Go Live</button></Link> */}
            </div>
        </div>
    )
}

export default poll
