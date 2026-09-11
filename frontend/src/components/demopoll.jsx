export default function LivePollDemo() {
  const results = [
    {
      label: "Real-time Polling",
      votes: "42%",
      width: "42%",
    },
    {
      label: "Interactive Quizzes",
      votes: "31%",
      width: "31%",
    },
    {
      label: "Audience Analytics",
      votes: "18%",
      width: "18%",
    },
    {
      label: "Live Leaderboards",
      votes: "9%",
      width: "9%",
    },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto">

      {/* Poll container */}

      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-gray-900/5">

        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-10">

          <div>

            <div className="flex items-center gap-2.5 mb-3">

              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-600 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live
              </span>

              <span className="text-xs text-gray-400 font-medium">
                Poll #024
              </span>

            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Poll Results
            </h3>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Which CrowdSync feature excites users the most?
            </p>

          </div>


          {/* Response count */}

          <div className="sm:text-right">

            <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
              800
            </p>

            <p className="text-xs text-gray-400 mt-1">
              total responses
            </p>

          </div>

        </div>


        {/* Results */}

        <div className="space-y-7">

          {results.map((item, index) => (

            <div key={index}>

              <div className="flex justify-between items-center mb-2.5">

                <p className="text-sm sm:text-base font-semibold text-gray-700">
                  {item.label}
                </p>

                <p className="text-sm font-bold text-indigo-600">
                  {item.votes}
                </p>

              </div>


              {/* Progress bar */}

              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-1000"
                  style={{ width: item.width }}
                />

              </div>

            </div>

          ))}

        </div>


        {/* Bottom information */}

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div className="flex items-center gap-2 text-sm text-gray-400">

            <span className="w-2 h-2 rounded-full bg-indigo-500" />

            Responses are updating in real time

          </div>


          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">

            <span className="text-indigo-600">
              4
            </span>

            options

          </div>

        </div>

      </div>

    </div>
  )
}