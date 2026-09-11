import { Link } from "react-router"

const quicknav = () => {
    return (
        <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50">

            <div className="group flex flex-col justify-center gap-3 w-16 hover:w-56 h-auto transition-all duration-500 overflow-hidden border border-gray-200 bg-white/85 backdrop-blur-xl hover:shadow-xl hover:shadow-indigo-100/50 p-3 rounded-2xl">

                <Link
                    to="/dashboard"
                    className="flex items-center gap-4 min-h-14 px-3 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all duration-300"
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

                    <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300 font-medium">
                        Dashboard
                    </span>
                </Link>


                <Link
                    to="/drafts"
                    className="flex items-center gap-4 min-h-14 px-3 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all duration-300"
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

                    <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300 font-medium">
                        Drafts
                    </span>
                </Link>


                <Link
                    to="/studio"
                    className="flex items-center gap-4 min-h-14 px-3 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all duration-300"
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

                    <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300 font-medium">
                        Studio
                    </span>
                </Link>


                {/* past polls */}

                <Link
                    to="/pastpolls"
                    className="flex items-center gap-4 min-h-14 px-3 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all duration-300"
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
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                    </svg>

                    <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300 font-medium">
                        Past Polls
                    </span>
                </Link>


                {/* past quizzes */}

                <Link
                    to="/pastquizzes"
                    className="flex items-center gap-4 min-h-14 px-3 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all duration-300"
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
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9.5 9a2.5 2.5 0 1 1 4.5 1.5c-.8.8-2 1.2-2 2.5" />
                        <path d="M12 17h.01" />
                    </svg>

                    <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300 font-medium">
                        Past Quizzes
                    </span>
                </Link>

            </div>

        </div>
    )
}

export default quicknav