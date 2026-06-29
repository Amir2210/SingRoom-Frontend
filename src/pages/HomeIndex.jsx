import { Link } from 'react-router'
import { AppHeader } from '../components/AppHeader'

export function HomeIndex() {
  return (
    <section className="page">
      <AppHeader />
      <div className="shell">
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
              SingRoom keeps your whole band in sync. The admin picks a song and everyone
              instantly sees the lyrics and chords tailored to their instrument — in English or Hebrew.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/login-page" className="btn-primary">Get started</Link>
              <Link to="/sign-up-page" className="btn-ghost">Create an account</Link>
            </div>
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
                <div className="text-2xl font-bold text-white">Auto</div>
                hands-free scroll
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
      </div>
    </section>
  )
}
