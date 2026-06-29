import { Link } from 'react-router'
import { FiUserPlus, FiUsers, FiClock, FiSearch, FiPlay, FiMonitor } from 'react-icons/fi'
import { AppHeader } from '../components/AppHeader'

const STEPS = [
  {
    icon: FiUserPlus,
    title: 'Create an admin account',
    desc: 'The band leader signs up as admin they drive the session and pick the songs.',
    to: '/admin-sign-up-page',
    cta: 'Sign up as admin',
  },
  {
    icon: FiUsers,
    title: 'Bandmates join in',
    desc: 'Each singer or player signs up and chooses their instrument.',
    to: '/sign-up-page',
    cta: 'Join as a singer',
  },
  {
    icon: FiClock,
    title: 'Gather in the waiting room',
    desc: 'Singers land in a live room and see who else is online, waiting for the first song.',
  },
  {
    icon: FiSearch,
    title: 'Admin picks a song',
    desc: 'The admin searches the library and selects a track for the whole room.',
  },
  {
    icon: FiPlay,
    title: 'Sing together, live',
    desc: 'Everyone jumps to the party page audio auto-plays and synced lyrics appear for all.',
  },
]

export function HomeIndex() {
  return (
    <section className="page pb-20">
      <AppHeader />
      <div className="shell">
        {/* Hero */}
        <div className="grid items-center gap-10 pt-8 sm:pt-16 lg:grid-cols-2">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-300">
              <span className="size-2 rounded-full bg-[#1ed760]" /> Real-time rehearsals
            </span>
            <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              <span className="secondary-txt">Play</span> & <span className="secondary-txt">sing</span>
              <br /> together, live.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-400">
              SingRoom keeps your whole band in sync. The admin picks a song and everyone instantly
              hears the track and sees the lyrics together in English or Hebrew.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/admin-sign-up-page" className="btn-primary">Create admin account</Link>
              <Link to="/sign-up-page" className="btn-ghost">Join as a singer</Link>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Already have an account? <Link to="/login-page" className="link-accent">Log in</Link>
            </p>
            <div className="mt-10 flex gap-8 text-sm text-zinc-400">
              <div>
                <div className="text-2xl font-bold text-white">Live</div>
                sync via sockets
              </div>
              <div>
                <div className="text-2xl font-bold text-white">RTL</div>
                Hebrew & English
              </div>
              <div>
                <div className="text-2xl font-bold text-white">Audio</div>
                + synced lyrics
              </div>
            </div>
          </div>

          <div className="animate-rise">
            <div className="glass-card flex items-center justify-center">
              <img
                className="w-full max-w-md"
                src="https://res.cloudinary.com/dxm0sqcfp/image/upload/v1742761436/jamoveo/undraw_mello_uiud_gml1lf.svg"
                alt="People playing music together"
              />
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20 sm:mt-28">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              How <span className="secondary-txt">SingRoom</span> works
            </h2>
            <p className="mt-3 text-zinc-400">From sign-up to singing in five quick steps.</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="glass-card flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-[#1DB954]/15 text-lg font-black text-[#1ed760]">
                      {i + 1}
                    </span>
                    <Icon className="size-6 text-zinc-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{step.desc}</p>
                  {step.to && (
                    <Link to={step.to} className="link-accent mt-auto pt-1 text-sm">
                      {step.cta} →
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Try it yourself */}
        <div className="mt-16">
          <div className="glass-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#1DB954]/15 text-[#1ed760]">
                <FiMonitor className="size-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">Want to try it yourself?</h3>
                <p className="mt-2 max-w-2xl text-zinc-400">
                  SingRoom syncs everyone in real time over sockets, and your login is tied to the
                  browser session. To play both roles at once, open the app in{' '}
                  <span className="font-semibold text-white">two different browsers</span> (or one
                  normal window and one incognito window):
                </p>
                <ol className="mt-4 space-y-2 text-zinc-300">
                  <li className="flex gap-1.5">
                    <span className="font-black text-[#1ed760]">1.</span>
                    In the first browser, create an<span className="font-semibold">admin</span>account and wait on the search page.
                  </li>
                  <li className="flex gap-1.5">
                    <span className="font-black text-[#1ed760]">2.</span>
                    In the second browser, sign up as a <span className="font-semibold">singer</span> and you'll land in the waiting room.
                  </li>
                  <li className="flex gap-1.5">
                    <span className="font-black text-[#1ed760]">3.</span>
                    Pick a song as the admin and watch the singer's screen jump to the live page instantly.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
