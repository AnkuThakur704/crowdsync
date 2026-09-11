import { Link } from "react-router"
const footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">

          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

            <div className="flex flex-col md:flex-row justify-between gap-8">

              <div>

                <div className="flex items-center gap-2.5">

                  

                  <span className="font-extrabold text-lg">
                    Crowd<span className="text-indigo-600">Sync</span>
                  </span>

                </div>

                <p className="text-gray-400 text-sm mt-4 max-w-xs">
                  Real-time polls and quizzes for more engaging audiences.
                </p>

              </div>


              <div className="flex gap-12 text-sm">
                <div>
                  <p className="font-semibold text-gray-900 mb-4">
                    Account
                  </p>

                  <div className="flex flex-col gap-3 text-gray-500">

                    <Link
                      to="/login"
                      className="hover:text-gray-900"
                    >
                      Log in
                    </Link>

                    <Link
                      to="/signup"
                      className="hover:text-gray-900"
                    >
                      Sign up
                    </Link>

                  </div>
                </div>

              </div>

            </div>


            <div className="border-t border-gray-100 mt-10 pt-6 text-sm text-gray-400">
              © {new Date().getFullYear()} CrowdSync. Built for better audience interaction.
            </div>

          </div>

        </footer>
  )
}

export default footer
