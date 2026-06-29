import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  SOCKET_EVENT_ADMIN_CHOOSE_SONG,
  SOCKET_EVENT_SESSION_STATE,
  SOCKET_EVENT_PARTICIPANTS,
  socketService,
} from '../services/socket.service'
import { setSong } from '../store/actions/user.actions'
import { AppHeader } from '../components/AppHeader'
import { Participants } from '../components/Participants'

export function WaitingRoom() {
  const navigate = useNavigate()
  const [participants, setParticipants] = useState(socketService.getParticipants())

  useEffect(() => {
    // Reconnect: if the admin already picked a song, jump straight to it.
    const current = socketService.getCurrentSong()
    if (current) {
      setSong(current, false)
      navigate('/live-song-page')
      return
    }

    socketService.on(SOCKET_EVENT_ADMIN_CHOOSE_SONG, onSetSong)
    socketService.on(SOCKET_EVENT_SESSION_STATE, onSessionState)
    socketService.on(SOCKET_EVENT_PARTICIPANTS, setParticipants)
    return () => {
      socketService.off(SOCKET_EVENT_ADMIN_CHOOSE_SONG, onSetSong)
      socketService.off(SOCKET_EVENT_SESSION_STATE, onSessionState)
      socketService.off(SOCKET_EVENT_PARTICIPANTS, setParticipants)
    }
  }, [])

  function onSetSong(song) {
    setSong(song, false)
    navigate('/live-song-page')
  }

  function onSessionState({ currentSong }) {
    if (currentSong) onSetSong(currentSong)
  }

  return (
    <section className="page">
      <AppHeader />
      <div className="shell">
        <div className="grid items-center gap-10 pt-8 sm:pt-16 lg:grid-cols-2">
          <div className="animate-rise">
            <div className="mb-6 flex items-end gap-1.5" style={{ height: '40px' }}>
              <span className="eq-bar" /><span className="eq-bar" /><span className="eq-bar" /><span className="eq-bar" />
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              Waiting for the admin to pick a{' '}
              <span className="loader">
                <span className="secondary-txt">s</span>
                <span className="secondary-txt">o</span>
                <span className="secondary-txt">n</span>
                <span className="secondary-txt">g</span>
                <span className="secondary-txt">.</span>
                <span className="secondary-txt">.</span>
                <span className="secondary-txt">.</span>
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-zinc-400">
              Sit tight! The moment a song is chosen, your lyrics and chords will appear here automatically.
            </p>
            <div className="mt-8">
              <Participants participants={participants} />
            </div>
          </div>
          <div className="animate-rise">
            <div className="glass-card flex items-center justify-center">
              <img
                className="w-full max-w-sm"
                src="https://res.cloudinary.com/dxm0sqcfp/image/upload/v1742741867/jamoveo/undraw_listening_fz9g_ktghit.svg"
                alt="Waiting room"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
