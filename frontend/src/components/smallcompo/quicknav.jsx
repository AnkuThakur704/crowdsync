import { Link } from "react-router"

const quicknav = () => {
    return (
        // <div className="fixed left-5  border border-green-300 w-15 h-[70vh] hover:w-50 transition-all duration-500 flex flex-col items-center gap-10">
        //     <Link className="bg-green-300/50 text-black px-2 py-15 text-sm w-full text-center" to={'/drafts'}><button>Drafts</button></Link>
        //     <Link className="bg-green-300/50 text-black px-2 py-15 text-sm w-full text-center" to={'/dashboard'}><button>Dashboard</button></Link>
        //     <Link  to={'/studio'} className="bg-green-300/50 text-black px-2 py-15 text-sm w-full text-center">Studio</Link>
        // </div>
        <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50">
  <div className="group flex flex-col justify-center  gap-10 w-16 hover:w-56 h-[50vh] transition-all duration-500 overflow-hidden  border border-amber-400/20 bg-black/40 backdrop-blur-xl hover:shadow-[0_0_30px_rgba(252,211,77,0.2)] p-3">

    <Link
      to="/dashboard"
      className="flex items-center gap-4 min-h-14 px-2 border border-black/40 text-green-100 hover:border-amber-400/60 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="4" rx="1" />
        <rect x="14" y="10" width="7" height="11" rx="1" />
        <rect x="3" y="13" width="7" height="8" rx="1" />
      </svg>

      <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300">
        Dashboard
      </span>
    </Link>

    <Link
      to="/drafts"
      className="flex items-center gap-4 min-h-14 px-2 border border-black/40 text-green-100 hover:border-amber-400/60 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0"
      >
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6" />
      </svg>

      <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300">
        Drafts
      </span>
    </Link>

    <Link
      to="/studio"
      className="flex items-center gap-4 min-h-14 px-2 border border-black/40 text-green-100 hover:border-amber-400/60 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 0 0-7-7" />
        <path d="M5 12a7 7 0 0 1 7-7" />
        <path d="M19 12a7 7 0 0 1-7 7" />
        <path d="M5 12a7 7 0 0 0 7 7" />
      </svg>

      <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300">
        Studio
      </span>
    </Link>

  </div>
</div>
    )
}

export default quicknav
