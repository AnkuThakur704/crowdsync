import React from 'react'

const participantlobby = ({leaveroom, qdata, count}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">

        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Get Ready!
          </h1>

          <p className="mt-4 text-xl text-gray-300">
            <span className="text-amber-400 font-semibold">
              {qdata.author.split("@")[0]}
            </span>{" "}
            will start the{" "}
            <span className="capitalize font-medium">
              {qdata.type}
            </span>{" "}
            shortly.
          </p>
        </div>

        <div className="flex gap-6">

          <div className="w-40  border border-white bg-[#2a2a2a] p-6 text-center">
            <p className="text-gray-400 text-sm">Participants</p>
            <h2 className="text-5xl font-bold mt-2">{count}</h2>
          </div>

          <div className="w-40  border border-white bg-[#2a2a2a] p-6 text-center">
            <p className="text-gray-400 text-sm">Status</p>
            <h2 className="mt-3 text-xl font-semibold text-green-500 animate-[pulse_1.5s_ease-in-out_infinite]">
              Waiting
            </h2>
          </div>

        </div>
        <button className=" w-30 border border-red-500 text-white  px-4 py-3 hover:cursor-pointer hover:border-[#2a2a2a] transition duration-400" onClick={leaveroom}>Leave</button>

      </div>
  )
}

export default participantlobby
