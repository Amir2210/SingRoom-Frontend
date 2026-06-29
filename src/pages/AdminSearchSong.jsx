import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { songService } from '../services/song.service'
import { setSong } from '../store/actions/user.actions'
import { SOCKET_EVENT_PARTICIPANTS, socketService } from '../services/socket.service'
import { AppHeader } from '../components/AppHeader'
import { Participants } from '../components/Participants'

export function AdminSearchSong() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSelecting, setIsSelecting] = useState(false)
  const [participants, setParticipants] = useState(socketService.getParticipants())
  const navigate = useNavigate()

  useEffect(() => {
    socketService.on(SOCKET_EVENT_PARTICIPANTS, setParticipants)
    return () => socketService.off(SOCKET_EVENT_PARTICIPANTS, setParticipants)
  }, [])

  // Debounced search against the backend song API.
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setIsLoading(true)
      try {
        const songs = await songService.query(search)
        setResults(songs)
      } catch {
        toast.error('Failed to load songs')
      } finally {
        setIsLoading(false)
      }
    }, 250)
    return () => clearTimeout(timeoutId)
  }, [search])

  async function onSetSong(song) {
    if (isSelecting) return
    try {
      setIsSelecting(true)
      // Attach playable audio + lyrics before broadcasting the song to everyone.
      const fullSong = await songService.enrich(song)
      await setSong(fullSong, true)
      navigate('/live-song-page')
    } catch {
      toast.error('Failed to select song')
    } finally {
      setIsSelecting(false)
    }
  }

  return (
    <section className="page">
      {isSelecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-card flex flex-col items-center gap-5 text-center animate-rise">
            <div className="flex items-end gap-1.5" style={{ height: '40px' }}>
              <span className="eq-bar" /><span className="eq-bar" /><span className="eq-bar" /><span className="eq-bar" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Setting up the song for the band…</h2>
              <p className="mt-1 text-sm text-zinc-400">Loading lyrics and audio. Everyone joins in a moment.</p>
            </div>
          </div>
        </div>
      )}
      <AppHeader />
      <div className="shell pb-16">
        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Pick a <span className="secondary-txt">song</span>
            </h1>
            <p className="mt-2 text-zinc-400">Search the library — everyone joins instantly.</p>
          </div>
          <Participants participants={participants} compact />
        </div>

        <label className="field mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          <input
            type="text"
            placeholder="Search by title or artist…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </label>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {isLoading ? (
            <p className="text-zinc-500">Loading…</p>
          ) : results.length > 0 ? (
            results.map((song) => (
              <button
                key={song._id}
                onClick={() => onSetSong(song)}
                disabled={isSelecting}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[#1DB954]/50 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <img className="size-16 rounded-xl object-cover" src={song.imgUrl} alt={song.title} />
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-bold text-white">{song.title}</h2>
                  <p className="truncate text-sm text-zinc-400">{song.artist}</p>
                </div>
                <span className="rounded-lg bg-[#1DB954]/15 px-3 py-1.5 text-sm font-semibold text-[#1ed760] opacity-0 transition-opacity group-hover:opacity-100">
                  {isSelecting ? 'Loading…' : 'Play ▸'}
                </span>
              </button>
            ))
          ) : (
            <p className="text-zinc-500">No songs found.</p>
          )}
        </div>
      </div>
    </section>
  )
}
