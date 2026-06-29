import io from 'socket.io-client'
import { userService } from './user.service'


export const SOCKET_EMIT_ADMIN_SET_SONG = 'admin-set-song'
export const SOCKET_EVENT_ADMIN_CHOOSE_SONG = 'admin-choose-song'

export const SOCKET_EMIT_ADMIN_SEARCH_FOR_NEW_SONG = 'admin-search-for-new-song'
export const SOCKET_EVENT_ADMIN_SEARCH_PICK_NEW_SONG = 'admin-pick-new-song'

export const SOCKET_EVENT_SESSION_STATE = 'session-state'
export const SOCKET_EVENT_PARTICIPANTS = 'participants-updated'

export const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3031'
export const socketService = createSocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()


function createSocketService() {
  var socket = null;
  var lastSong = null;
  var lastParticipants = [];
  const socketService = {
    setup() {
      socket = io(baseUrl)
      // Cache session state so pages mounting after the event can still sync.
      socket.on(SOCKET_EVENT_SESSION_STATE, (data) => { lastSong = data?.currentSong || null })
      socket.on(SOCKET_EVENT_ADMIN_CHOOSE_SONG, (song) => { lastSong = song })
      socket.on(SOCKET_EVENT_ADMIN_SEARCH_PICK_NEW_SONG, () => { lastSong = null })
      socket.on(SOCKET_EVENT_PARTICIPANTS, (list) => { lastParticipants = list || [] })
      const user = userService.getLoggedinUser()
      if (user) this.login(user)
    },
    getCurrentSong() {
      return lastSong
    },
    getParticipants() {
      return lastParticipants
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(user) {
      // Accept either a full user object or a bare id (backwards compatible).
      const payload = (user && typeof user === 'object')
        ? { _id: user._id, userName: user.userName, instrument: user.instrument, isAdmin: user.isAdmin }
        : { _id: user }
      socket.emit(SOCKET_EMIT_LOGIN, payload)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}

