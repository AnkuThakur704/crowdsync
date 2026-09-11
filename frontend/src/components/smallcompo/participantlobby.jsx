

const participantlobby = ({leaveroom, qdata, count}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">

    <div className="text-center">

       

        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Get Ready!
        </h1>

        <p className="mt-4 text-xl text-gray-500">
            <span className="text-indigo-600 font-semibold">
                {qdata.author.split("@")[0]}
            </span>{" "}
            will start the{" "}
            <span className="capitalize font-semibold text-gray-800">
                {qdata.type}
            </span>{" "}
            shortly.
        </p>

    </div>


    <div className="flex gap-5">

        <div className="w-44 bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">

            <p className="text-gray-400 text-sm font-medium">
                Participants
            </p>

            <h2 className="text-5xl font-extrabold mt-2 text-gray-900">
                {count}
            </h2>

        </div>


        <div className="w-44 bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">

            <p className="text-gray-400 text-sm font-medium">
                Status
            </p>

            <h2 className="mt-3 text-xl font-semibold text-green-500 animate-[pulse_1.5s_ease-in-out_infinite]">
                Waiting
            </h2>

        </div>

    </div>


    <button
        className="w-30 border border-red-200 bg-red-50 text-red-600 px-4 py-3 rounded-xl font-semibold hover:bg-red-600 hover:text-white hover:border-red-600 cursor-pointer transition-all duration-300"
        onClick={leaveroom}
    >
        Leave
    </button>

</div>
  )
}

export default participantlobby
