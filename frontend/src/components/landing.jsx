import LivePollDemo from "./demopoll"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import LoadingAnim from "./loadingAnim"

const url = import.meta.env.VITE_BACKEND_URL

const Landing = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const onLoading = async () => {
    try {
      const r = await fetch(`${url}/routes/verifyloggedin`, {
        method: "POST",
        credentials: "include",
      })

      if (r.status === 200) {
        navigate("/dashboard")
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    onLoading()

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const scrollToDemo = () => {
    document
      .getElementById("demo")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <LoadingAnim />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111827] overflow-x-hidden">

      {/* ================= NAVBAR ================= */}

     


      {/* ================= HERO ================= */}

      <main className="pt-20">

        <section className="relative px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">

          {/* Background decoration */}

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-3xl -top-72 left-1/2 -translate-x-1/2" />

            <div className="absolute w-[400px] h-[400px] bg-violet-200/20 rounded-full blur-3xl top-72 -right-48" />
          </div>

          <div className="relative max-w-7xl mx-auto">

  {/* Decorative background elements */}

  <div className="absolute -top-20 left-20 w-72 h-72 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none" />

  <div className="absolute top-40 right-10 w-80 h-80 bg-violet-100/50 rounded-full blur-3xl pointer-events-none" />


  <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-20 items-center">


    {/* ================= LEFT ================= */}

    <div className="text-left">
      {/* Heading */}

      <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-0.055em] leading-[0.98]">

        Don't just
        <br />

        <span className="text-gray-300">
          talk
        </span>{" "}

        <span className="relative inline-block">

          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            connect.
          </span>

          {/* underline */}

          <svg
            className="absolute -bottom-3 left-0 w-full"
            viewBox="0 0 300 12"
            fill="none"
          >
            <path
              d="M3 8C72 2 204 2 297 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-indigo-200"
            />
          </svg>

        </span>

      </h1>


      {/* Description */}

      <p className="mt-9 max-w-xl text-lg text-gray-500 leading-relaxed">
        CrowdSync turns presentations, classrooms, events and meetings
        into conversations — with live polls, quizzes and instant audience
        feedback.
      </p>


      {/* CTA */}

      <div className="flex flex-wrap items-center gap-4 mt-9">

        <Link
          to="/signup"
          className="group px-6 py-3.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition flex items-center gap-3 shadow-lg shadow-gray-900/10"
        >

          Start a session

          <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 transition">
            →
          </span>

        </Link>


        <button
          onClick={scrollToDemo}
          className="px-5 py-3.5 text-gray-600 font-semibold hover:text-gray-900 transition flex items-center gap-2"
        >

          <span className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-xs shadow-sm">
            ▶
          </span>

          See how it works

        </button>

      </div>


      {/* Small metrics */}

      <div className="flex items-center gap-8 mt-10 pt-8 border-t border-gray-200 max-w-lg">

        <div>
          <p className="text-lg font-bold text-gray-900">
            Real-time
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Responses
          </p>
        </div>


        <div className="w-px h-8 bg-gray-200" />


        <div>
          <p className="text-lg font-bold text-gray-900">
            QR
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Instant joining
          </p>
        </div>


        <div className="w-px h-8 bg-gray-200" />


        <div>
          <p className="text-lg font-bold text-gray-900">
            Live
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Analytics
          </p>
        </div>

      </div>

    </div>


    {/* ================= RIGHT ================= */}

    <div className="relative min-h-[470px] flex items-center justify-center">


      {/* Main visual card */}

  


      {/* Decorative dots */}

      <div className="absolute top-5 right-10 grid grid-cols-5 gap-2 opacity-40">

        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-indigo-300"
          />
        ))}

      </div>


      {/* Decorative ring */}

      <div className="absolute w-72 h-72 rounded-full border border-indigo-100 -z-0" />

      <div className="absolute w-96 h-96 rounded-full border border-indigo-50 -z-0" />

    </div>

  </div>

</div>


          {/* ================= PRODUCT PREVIEW ================= */}

          <div
            id="demo"
            className="relative max-w-6xl mx-auto mt-20"
          >

            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200/30 via-violet-200/30 to-purple-200/30 blur-2xl rounded-[40px]" />

            <div className="relative rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10 overflow-hidden">

              {/* Browser bar */}

              <div className="h-12 px-5 border-b border-gray-100 flex items-center gap-2 bg-gray-50/80">

                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                </div>

                <div className="hidden sm:flex mx-auto w-80 h-7 rounded-lg bg-white border border-gray-200 items-center justify-center text-xs text-gray-400">
                  crowdsync.app
                </div>

              </div>


              {/* Existing demo */}

              <div className="p-4 sm:p-8 lg:p-12 bg-white">
                <LivePollDemo />
              </div>

            </div>

          </div>

        </section>


        {/* ================= STATS ================= */}

        <section className="border-y border-gray-200 bg-white">

          <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <p className="text-3xl font-extrabold tracking-tight">
                Real-time
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Live responses
              </p>
            </div>

            <div>
              <p className="text-3xl font-extrabold tracking-tight">
                Instant
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Results
              </p>
            </div>

            <div>
              <p className="text-3xl font-extrabold tracking-tight">
                QR
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Easy joining
              </p>
            </div>

            <div>
              <p className="text-3xl font-extrabold tracking-tight">
                1-click
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Participation
              </p>
            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section
          id="features"
          className="px-6 py-28 lg:py-36"
        >

          <div className="max-w-7xl mx-auto">

            <div className="max-w-2xl mb-16">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 mb-4">
                Everything you need
              </p>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-tight">
                Engagement shouldn't
                <span className="text-gray-400">
                  {" "}feel complicated.
                </span>
              </h2>

              <p className="mt-6 text-lg text-gray-500 leading-relaxed">
                CrowdSync gives you everything needed to turn passive
                audiences into active participants.
              </p>

            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {[
                {
                  number: "01",
                  title: "Live Polling",
                  description:
                    "Ask questions and see audience responses appear instantly as they happen.",
                },
                {
                  number: "02",
                  title: "Interactive Quizzes",
                  description:
                    "Create competitive quizzes with instant scoring and live participation.",
                },
                {
                  number: "03",
                  title: "Real-Time Analytics",
                  description:
                    "Understand your audience through live results, graphs and statistics.",
                },
                {
                  number: "04",
                  title: "Live Leaderboards",
                  description:
                    "Keep participants engaged with dynamic rankings during your quizzes.",
                },
                {
                  number: "05",
                  title: "QR & Room Codes",
                  description:
                    "Let participants join instantly without downloading another application.",
                },
                {
                  number: "06",
                  title: "Reusable Sessions",
                  description:
                    "Save your polls and quizzes and use them again whenever you need them.",
                },
              ].map((feature) => (

                <div
                  key={feature.number}
                  className="group p-8 rounded-3xl border border-gray-200 bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                >

                  <div className="flex items-start justify-between mb-12">

                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      {feature.number}
                    </div>

                    <span className="text-gray-300 group-hover:text-indigo-400 transition text-xl">
                      ↗
                    </span>

                  </div>

                  <h3 className="text-xl font-bold mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section
          id="how-it-works"
          className="px-6 py-28 bg-gray-950 text-white"
        >

          <div className="max-w-6xl mx-auto">

            <div className="text-center max-w-2xl mx-auto">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400 mb-4">
                Simple by design
              </p>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em]">
                From question to
                <span className="text-indigo-400">
                  {" "}interaction.
                </span>
              </h2>

              <p className="mt-6 text-gray-400 text-lg">
                Get your audience participating in three simple steps.
              </p>

            </div>


            <div className="grid md:grid-cols-3 gap-6 mt-20">

              {[
                {
                  step: "01",
                  title: "Create",
                  description:
                    "Build a poll or quiz with your questions and customize it for your audience.",
                },
                {
                  step: "02",
                  title: "Share",
                  description:
                    "Give your audience a room code or QR code. They can join instantly from their phone.",
                },
                {
                  step: "03",
                  title: "Engage",
                  description:
                    "Watch responses arrive live, reveal results and keep everyone involved.",
                },
              ].map((item) => (

                <div
                  key={item.step}
                  className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition"
                >

                  <span className="text-7xl font-black text-white/[0.06] absolute top-4 right-6">
                    {item.step}
                  </span>

                  <div className="relative">

                    <p className="text-indigo-400 text-sm font-bold mb-16">
                      STEP {item.step}
                    </p>

                    <h3 className="text-2xl font-bold mb-4">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="px-6 py-28 lg:py-36">

          <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[40px] bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-8 py-20 sm:px-16 text-center text-white">

            <div className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl -top-40 -left-20" />
            <div className="absolute w-96 h-96 rounded-full bg-black/10 blur-3xl -bottom-48 -right-20" />

            <div className="relative">

              <p className="text-indigo-100 text-sm font-bold uppercase tracking-[0.2em] mb-5">
                Ready to engage?
              </p>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em]">
                Make your next session
                <br />
                <span className="text-white/70">
                  impossible to ignore.
                </span>
              </h2>

              <p className="max-w-xl mx-auto mt-6 text-indigo-100 text-lg leading-relaxed">
                Create your first live poll or quiz and see how easy
                audience interaction can be.
              </p>

              <Link
                to="/signup"
                className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition shadow-xl"
              >
                Get started for free
                <span>→</span>
              </Link>

            </div>

          </div>

        </section>


        {/* ================= FOOTER ================= */}

      

      </main>

    </div>
  )
}

export default Landing