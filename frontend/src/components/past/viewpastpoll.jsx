import { useState, useEffect } from "react"
import givelastupdated from '../../../helpers/getdate'
import Quicknav from '../smallcompo/quicknav'
const backend_url = import.meta.env.VITE_BACKEND_URL

const viewpastpoll = () => {
    const [polldata, setpolldata] = useState()
    const [idx, setidx] = useState(0)
    const params = new URLSearchParams(window.location.search)
    const qid = params.get("qid")
    const instance = params.get("instance")
    console.log("url ", `${backend_url}/routes/viewpastpoll?${qid}&${instance}`)
    const getpolldata= async()=>{
        let data = await fetch(`${backend_url}/routes/viewpastpoll?qid=${qid}&instance=${instance}`)
        data  = await data.json()
        setpolldata(data.polldata)
    }
    useEffect(() => {
      getpolldata()
    }, [])
    useEffect(() => {
      console.log("poll data: ", polldata)
    }, [polldata])

    const givetotalvotes = (options)=>{
        let total =0;
        for(let i=0;i<options.length;i++) total+= options[i].votes
        return total
    }
    const next = ()=>{
        if(idx+1<polldata.pages.length){
            let curr = idx
            setidx(curr+1)
        }
    }
    const prev = ()=>{
        if(idx-1>=0){
            let curr= idx
            setidx(curr-1)
        }
    }
    
  return (
    <div className="min-h-screen bg-white text-gray-900 px-8 pt-24 pb-10">
    <Quicknav />

    {polldata != null ? (
        <div className="max-w-5xl mx-auto relative">

            {/* Navigation */}
            <div className="flex justify-end gap-3 mb-6">
                <button
                    onClick={prev}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 cursor-pointer"
                >
                    Previous
                </button>

                <button
                    onClick={next}
                    className="px-4 py-2 bg-gray-900 border border-gray-900 rounded-xl text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-200 cursor-pointer"
                >
                    Next
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    {polldata.qname}
                </h1>

                <div className="text-gray-400 text-sm mt-2 flex items-center gap-3">
                    <p className="font-mono">
                        {polldata.qid}
                    </p>

                    <span className="text-gray-300">•</span>

                    <p>
                        Last hosted{" "}
                        {givelastupdated(polldata.updatedAt)}
                    </p>
                </div>

                <div className="mt-12">

                    <div className="flex items-center gap-1.5 mb-6">
                        <p className="text-xl font-semibold text-indigo-600">
                            {polldata.pages[idx].id + 1}.
                        </p>

                        <p className="text-xl font-semibold text-gray-800">
                            {polldata.pages[idx].statement}
                        </p>
                    </div>

                    <div className="flex items-end gap-10 h-72 border-b border-gray-200 px-4">

                        {polldata.pages[idx].options.map((o, key) => {
                            const totalVotes = givetotalvotes(
                                polldata.pages[idx].options
                            );

                            const height =
                                totalVotes === 0
                                    ? 0
                                    : (o.votes / totalVotes) * 100;

                            return (
                                <div
                                    key={key}
                                    className="h-full flex flex-col justify-end items-center flex-1"
                                >

                                    <p className="text-sm font-semibold text-gray-500 mb-2">
                                        {o.votes}
                                    </p>

                                    <div
                                        className="w-16 bg-indigo-500 rounded-t-xl hover:bg-violet-500 transition-all duration-300"
                                        style={{ height: `${height}%` }}
                                    />

                                    <p className="text-sm text-gray-500 mt-3 max-w-24 text-center">
                                        {o.text}
                                    </p>

                                </div>
                            );
                        })}

                    </div>
                </div>

            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-12 py-10 text-center">
                <p className="text-gray-500">
                    No data
                </p>
            </div>
        </div>
    )}
</div>
  )
}

export default viewpastpoll
