import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SongLyrics } from '../components/SongLyrics'
import { Participants } from '../components/Participants'
import { goBackPickSong, setSong } from '../store/actions/user.actions'
import {
  SOCKET_EVENT_ADMIN_SEARCH_PICK_NEW_SONG,
  SOCKET_EVENT_PARTICIPANTS,
  socketService,
} from '../services/socket.service'
import { AppHeader } from '../components/AppHeader'

const FLOATING_NOTES = ['♪', '♫', '♬', '🎵', '🎶', '♩', '🎸', '🎤']
const VIZ_BARS = Array.from({ length: 28 })

export function LiveSong() {
  const selectedSong = useSelector((storeState) => storeState.systemModule.songSelected)
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [participants, setParticipants] = useState(socketService.getParticipants())

  const isAdmin = user?.isAdmin
  const hasSong = selectedSong && selectedSong.lyrics
  const hasLyrics =
    Array.isArray(selectedSong?.lyrics) &&
    selectedSong.lyrics.some((line) => line.length > 0)

  // Reconnect on refresh: pull the live song from the cached session state.
  useEffect(() => {
    if (!hasSong) {
      const current = socketService.getCurrentSong()
      if (current) {
        setSong(current, false)
      } else {
        navigate(isAdmin ? '/admin-search-song-page' : '/waiting-room-page')
      }
    }
  }, [])

  useEffect(() => {
    socketService.on(SOCKET_EVENT_ADMIN_SEARCH_PICK_NEW_SONG, onAdminPauseLive)
    socketService.on(SOCKET_EVENT_PARTICIPANTS, setParticipants)
    return () => {
      socketService.off(SOCKET_EVENT_ADMIN_SEARCH_PICK_NEW_SONG, onAdminPauseLive)
      socketService.off(SOCKET_EVENT_PARTICIPANTS, setParticipants)
    }
  }, [])

  // Auto-play the audio as soon as it's available. Browsers block sound without a
  // user gesture, so on rejection we surface a one-tap "Tap to play" overlay.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !selectedSong?.audioUrl) return
    audio.play()
      .then(() => setAutoplayBlocked(false))
      .catch(() => setAutoplayBlocked(true))
  }, [selectedSong?.audioUrl])

  function onAdminPauseLive() {
    if (!isAdmin) navigate('/waiting-room-page')
  }

  async function onGoBackPickSong() {
    try {
      await goBackPickSong()
      navigate('/admin-search-song-page')
    } catch {
      toast.error('Failed to go back to pick a new song')
    }
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => { })
    else audio.pause()
  }

  function startFromOverlay() {
    setAutoplayBlocked(false)
    audioRef.current?.play().catch(() => setAutoplayBlocked(true))
  }

  if (!hasSong) return null

  return (
    <section className="party-stage flex h-screen flex-col overflow-hidden">
      {/* Animated background + floating notes */}
      <div className="party-bg" aria-hidden="true" />
      <div className="party-notes" aria-hidden="true">
        {FLOATING_NOTES.map((note, i) => (
          <span key={i} className="party-note" style={{ left: `${8 + i * 11}%`, animationDelay: `${i * 1.3}s`, animationDuration: `${9 + (i % 4) * 2}s` }}>
            {note}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <AppHeader />

        {selectedSong.audioUrl && (
          <audio
            ref={audioRef}
            src={selectedSong.audioUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            preload="auto"
          />
        )}

        {/* Now-playing hero */}
        <div className="shell flex flex-col items-center gap-4 pb-2 text-center">
          <div className="album-wrap">
            <div className={`album-ring ${isPlaying ? 'is-spinning' : ''}`} />
            {selectedSong.imgUrl ? (
              <img className="album-art" src={selectedSong.imgUrl} alt={selectedSong.title} />
            ) : (
              <div className="album-art flex items-center justify-center text-5xl">🎵</div>
            )}
            <div className="album-eq">
              <span className="eq-bar" /><span className="eq-bar" /><span className="eq-bar" /><span className="eq-bar" />
            </div>
          </div>

          <div>
            <h1 className="party-title text-3xl font-black sm:text-4xl">{selectedSong.title}</h1>
            <p className="text-lg secondary-txt">{selectedSong.artist}</p>
          </div>

          <Participants participants={participants} compact />
        </div>

        {/* Lyrics */}
        <div className="shell relative flex-1 overflow-hidden pb-32">
          <div className="lyrics-scroll glass-card h-full overflow-y-auto text-center animate-rise">
            {hasLyrics ? (
              <SongLyrics song={selectedSong.lyrics} userInstrument="vocals" fontSize={26} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  Now playing
                </span>
                <div className={`visualizer ${isPlaying ? '' : 'is-paused'}`} aria-hidden="true">
                  {VIZ_BARS.map((_, i) => (
                    <span
                      key={i}
                      className="viz-bar"
                      style={{
                        animationDelay: `${(i % 7) * 0.12}s`,
                        animationDuration: `${0.8 + (i % 5) * 0.18}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          {hasLyrics && <div className="lyrics-fade" aria-hidden="true" />}
        </div>

        {/* Minimal control bar */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center p-4">
          <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-black/70 px-5 py-3 backdrop-blur-xl">
            {selectedSong.audioUrl && (
              <button onClick={togglePlay} className="btn-primary">
                {isPlaying ? '❚❚ Pause' : '▶ Play'}
              </button>
            )}
            {isAdmin && (
              <button onClick={onGoBackPickSong} className="btn-ghost">
                Pick new song
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Autoplay fallback */}
      {selectedSong.audioUrl && autoplayBlocked && (
        <button
          onClick={startFromOverlay}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-black/70 backdrop-blur-sm"
        >
          <span className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#1ed760] to-[#169c45] text-3xl text-white shadow-[0_8px_24px_rgba(29,185,84,0.45)]">
            ▶
          </span>
          <span className="text-xl font-bold text-white">Tap to play</span>
          <span className="text-sm text-zinc-400">Your browser blocked autoplay tap anywhere to start the music.</span>
        </button>
      )}
    </section>
  )
}
