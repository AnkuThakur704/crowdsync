

export default function LivePollDemo() {
  

  return (
    <div className="mt-24 bg-[#2b2b2b] border border-amber-200/20 rounded-3xl p-8 w-full max-w-5xl shadow-2xl shadow-black/40">
  
  <div className="flex flex-col items-start justify-baseline mb-10">
    <div className="flex flex-col items-start">
      <p className="text-2xl font-semibold">
        Poll Results
      </p>

      <p className="text-sm text-gray-400 mt-2">
        Which CrowdSync feature excites users the most?
      </p>
    </div>

   
  </div>

  
  <div className="space-y-8">

    {[
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
    ].map((item, index) => (
      <div key={index}>
        
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-medium">
            {item.label}
          </p>

          <p className="text-amber-300 font-semibold">
            {item.votes}
          </p>
        </div>

        
        <div className="w-full h-6 bg-[#1f1f1f] rounded-full overflow-hidden border border-amber-200/5">
          <div
            className="h-full bg-amber-300 rounded-full transition-all duration-1000"
            style={{ width: item.width }}
          ></div>
        </div>
      </div>
    ))}
  </div>

  
  <div className="flex items-center justify-center gap-6 mt-12">
    
    <div className="bg-[#1f1f1f] rounded-2xl p-5 border border-amber-200/10 text-center">
      <p className="text-3xl font-bold text-amber-300">
        800
      </p>

      <p className="text-gray-400 text-sm mt-2">
        Total Responses
      </p>
    </div>
    
    
    
  </div>
</div>
  );
}