import { useState,useEffect } from "react";
import {useAuth} from '../../../helpers/Authcontext'
import Quicknav from '../smallcompo/quicknav'
import { golive } from "../helpers";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { message } from "../toast";
import notify from "../toast";

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
        if(r.status==200) message("Your work is saved successfully.")
        else notify("Unable to save your work.")

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
    <div className="h-full w-full bg-white text-gray-900 flex flex-col items-center justify-center px-3 relative overflow-hidden pt-0 z-0">

    <Quicknav />
    <ToastContainer/>
    <p className="text-indigo-600 font-semibold text-lg mb-2">
        {quizname}
    </p>

    <div className="w-full h-full pt-3 flex items-center gap-5">

        {/* Pages */}
        <div className="h-[80vh] w-[20vw] bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col items-center p-3 overflow-y-auto overflow-x-hidden gap-2 relative">

            {pages.map((item, key) =>
                <button
                    key={key}
                    onClick={(e) => setselectedpage(key)}
                    className="w-[16vw] h-20 text-sm text-gray-500 flex items-center justify-center hover:cursor-pointer bg-gray-50 border border-gray-200 rounded-xl shrink-0 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-200"
                >
                    Page {item.id}
                </button>
            )}

            <button
                onClick={(e) => {
                    setpages([...pages, {
                        id: pages.length + 1,
                        statement: "What is 2+2?",
                        correct:0,
                        time:30,
                        options: [{text:"4"},{text:"3"},{text:"9"}]
                    }]);
                    setselectedpage(pages.length)
                }}
                className="absolute bottom-6 left-64 w-[4vw] h-10 z-10 text-gray-700 border border-gray-200 bg-white rounded-xl mt-5 hover:cursor-pointer text-center text-2xl font-extrabold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200 shadow-sm"
            >
                +
            </button>

        </div>


        {/* Question Preview */}
        <div className="h-[80vh] w-[50vw] bg-gray-50 border border-gray-200 rounded-2xl shadow-sm flex flex-col items-start pl-10 justify-around">

            <p className="text-4xl font-bold tracking-tight text-gray-900">
                {pages[selectedpage].statement}
            </p>

            <div className="flex flex-col items-start gap-7">

                {pages[selectedpage].options.map((option, key) =>
                    <p className="text-xl border px-5 py-3 border-gray-200 bg-white rounded-xl text-gray-700 hover:cursor-pointer hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm transition-all duration-200">
                        {option.text}
                    </p>
                )}

            </div>

        </div>


        {/* Quiz Editor */}
        <div className="w-[20vw] h-150 bg-white border border-gray-200 rounded-2xl p-5 overflow-y-auto shadow-sm">

            {/* Timer */}
            <div className="w-full border border-indigo-100 bg-indigo-50 rounded-xl p-3 mb-4">

                <input
                    type="range"
                    min="10"
                    max="90"
                    step="20"
                    value={pages[selectedpage].time}
                    onChange={(e) => setpages(pages.map((page,key)=>key===selectedpage?{...page,time:e.target.value}:page))}
                    className="w-full cursor-pointer accent-indigo-600"
                />

                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                    <p>10s</p>
                    <p>30s</p>
                    <p>50s</p>
                    <p>70s</p>
                    <p>90s</p>
                </div>

            </div>


            <form className="flex flex-col items-start gap-8 w-full">

                {/* Statement */}
                <div className="flex flex-col items-start gap-5 w-full">

                    <label
                        htmlFor="statement"
                        className="text-indigo-600 font-semibold"
                    >
                        Poll Statement
                    </label>

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
                        className="statement w-full resize-none overflow-hidden bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition"
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />

                </div>


                {/* Correct option */}
                <div className="flex flex-col items-start gap-3 w-full">

                    <label
                        htmlFor="correctOption"
                        className="text-indigo-600 font-semibold"
                    >
                        Write the correct option Number
                    </label>

                    <input
                        rows={1}
                        onChange={(e)=>setpages(pages.map((page,index)=>
                        index===selectedpage?{...page,correct: e.target.value===""?0:e.target.value-1}:page))}
                        placeholder={pages[selectedpage].correct +1}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition"
                    />

                </div>


                {/* Options */}
                <div className="flex flex-col items-start gap-5 w-full">

                    <label
                        htmlFor="options"
                        className="text-indigo-600 font-semibold"
                    >
                        Options
                    </label>

                    <div className="w-full flex flex-col gap-2">

                        {pages[selectedpage].options.map((item, key) =>
                            <div className="flex items-center gap-1">

                                <p className="w-8 h-10 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 text-indigo-600 font-semibold shrink-0">
                                    {key+1}
                                </p>

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
                                    className="statement w-full resize-none overflow-hidden bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 border border-gray-200 rounded-xl p-3 transition"
                                    onInput={(e) => {
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}
                                />

                            </div>
                        )}

                        <button
                            type="button"
                            onClick={(e) => setpages(pages.map((page, pageIndex) =>
                                pageIndex === selectedpage
                                    ? {
                                        ...page,
                                        options: [...page.options, {text:"write something here"}]
                                    }
                                    : page
                            ))}
                            className="statement w-full resize-none overflow-hidden focus:outline-none bg-white text-indigo-600 border border-indigo-200 rounded-xl p-3 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition"
                        >
                            Add Option
                        </button>

                    </div>

                </div>

            </form>

        </div>


        {/* Bottom Actions */}

        <div className="absolute top-0 right-8 flex items-center gap-3">

            <button
                type="button"
                onClick={savepage}
                className="bg-gray-900 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-600 cursor-pointer transition-all duration-300 shadow-lg shadow-gray-900/10"
            >
                Save page
            </button>

            <button
                onClick={(e)=>golive(navigate, qidofdraft?qidofdraft:qid)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-600/20"
            >
                Go Live
            </button>

        </div>

    </div>

</div>
  )
}

export default quiz
