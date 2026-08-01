import { useState,useEffect } from "react";
import {useAuth} from '../../../helpers/Authcontext'
import Quicknav from '../smallcompo/quicknav'
import { golive } from "../helpers";
import { useNavigate } from "react-router";

const backend_url = import.meta.env.VITE_BACKEND_URL
const qid = crypto.randomUUID()
const quiz = ({qname,qidofdraft}) => {
    const navigate = useNavigate()
    const {userdata} = useAuth()
    const [quizname, setquizname] = useState(qname)
    const [time, settime] = useState()
    const [selectedpage, setselectedpage] = useState(0)
    const [pages, setpages] = useState([
        {id:1,
            statement:"What is 2+2?",
            time:30,
            correct:0,
            options:[{text:"4"},{text:"3"},{text:"9"}]
        }
    ])
    const savepage = async(e)=>{
         e.preventDefault()
        console.log("pages: ", pages, selectedpage)
        const r = await fetch(`${backend_url}/routes/savepage`,{method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                qid: qidofdraft?qidofdraft:qid,
                type: "quiz",
                qname:quizname,
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
                setquizname(data.qname)
                setpages(data.pages)
            }
        }
        useEffect(() => {
          onreload()
        }, [])
  return (
    <div className="h-full w-full  bg-[#1f1f1f] text-white flex flex-col items-center justify-center px-3 relative overflow-hidden pt-0 z-0">
        <Quicknav/>
            <p className="text-green-300">{quizname}</p>
            <div className="w-full h-full pt-3 flex items-center gap-5">
                <div className="h-[80vh] w-[20vw] border border-white flex flex-col items-center p-2 overflow-y-auto overflow-x-hidden gap-2">

                    {pages.map((item, key) =>
                        <button key={key} onClick={(e) => setselectedpage(key)} className="w-[16vw] h-20 text-sm  text-white/80 flex items-center justify-center hover:cursor-pointer bg-white/10 border border-white/10 shrink-0">Page {item.id}</button>)}

                    <button onClick={(e) => {setpages([...pages, {
                        id: pages.length + 1,
                        statement: "What is 2+2?",
                        correct:0,
                        time:30,
                        options: [{text:"4"},{text:"3"},{text:"9"}]
                    }]); setselectedpage(pages.length)}} className="absolute bottom-10 left-64 w-[4vw] h-10   z-10 text-white border border-zinc-300 bg-zinc-900 mt-5 hover:cursor-pointer text-center text-2xl font-extrabold">+</button>
                </div>
                <div className="h-[80vh] w-[50vw] bg-zinc-900 border border-white/20 flex flex-col items-start pl-10 justify-around">
                    <p className="text-4xl">{pages[selectedpage].statement}</p>
                    <div className="flex flex-col items-start gap-7">
                        {pages[selectedpage].options.map((option, key) =>
                            <p className="text-xl border px-5 py-3 border-amber-200 hover:cursor-pointer">{option.text}</p>)}
                    </div>
                </div>
                
                <div className="w-[20vw] h-150 border border-amber-300 p-3 overflow-y-auto">
                    <div className="w-full  border border-emerald-500/20 bg-zinc-900/80 p-3 backdrop-blur-sm mb-2">
  <input
    type="range"
    min="10"
    max="90"
    step="20"
    value={pages[selectedpage].time}
    onChange={(e) => setpages(pages.map((page,key)=>key===selectedpage?{...page,time:e.target.value}:page))}
    className="w-full cursor-pointer accent-emerald-400"
  />

  <div className="flex items-center justify-between ">
    <p>10s</p>
    <p>30s</p>
    <p>50s</p>
    <p>70s</p>
    <p>90s</p>
  </div>

  
</div>
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
                            <div>
                                <label htmlFor="correctOption">Write the correct option Number</label>
                                <input 
                                rows={1}
                                onChange={(e)=>setpages(pages.map((page,index)=>
                                index===selectedpage?{...page,correct: e.target.value===""?0:e.target.value-1}:page))} placeholder={pages[selectedpage].correct +1} />
                            </div>
                            <label htmlFor="options" className="text-green-300">Options</label>
                            <div className="flex flex-col gap-2">
                                {pages[selectedpage].options.map((item, key) =>
                                <div className="flex items-center gap-1">
                                    <p className="w-7 border border-green-600 text-center p-2">{key+1}</p>
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
                                                                optionIndex === key ? {...option,text:e.target.value} : option
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
                                </div>
                                )}
                                <button type="button" onClick={(e) => setpages(pages.map((page, pageIndex) =>
                                    pageIndex === selectedpage
                                        ? {
                                            ...page,
                                            options: [...page.options, {text:"write something here"}]
                                        }
                                        : page
                                ))} className="statement w-full resize-none overflow-hidden focus:outline-none focus:text-gray-300 border border-green-200 p-2">Add Option</button>

                            </div>
                        </div>
                        {/* <input type="text" placeholder="Eg. What game do you like the most" className="focus:outline-none focus:text-gray-300" /> */}
                        <button type="button" onClick={savepage}>Save page</button>
                    </form>
                </div>
                <button onClick={(e)=>golive(navigate, qidofdraft?qidofdraft:qid)}>Go Live</button>
            </div>
        </div>
  )
}

export default quiz
