// Audius free streaming via the public REST API (no SDK, no key needed — only an
// app_name identifier). Docs: https://docs.audius.co/api
const APP_NAME = 'JaMoveo'
const FALLBACK_HOST = 'https://discoveryprovider.audius.co'

let hostPromise = null

// Discover a healthy Audius content node once, then reuse it.
function getHost() {
  if (!hostPromise) {
    hostPromise = fetch('https://api.audius.co')
      .then((res) => res.json())
      .then(({ data }) =>
        Array.isArray(data) && data.length
          ? data[Math.floor(Math.random() * data.length)]
          : FALLBACK_HOST
      )
      .catch(() => FALLBACK_HOST)
  }
  return hostPromise
}

export const audiusService = {
  search,
  getTrending,
  getStreamUrl,
}

function _mapTrack(track) {
  const artwork = track?.artwork || {}
  return {
    _id: track.id,
    title: track.title,
    artist: track.user?.name || track.user?.handle || 'Unknown artist',
    imgUrl: artwork['480x480'] || artwork['150x150'] || artwork['1000x1000'] || '',
    duration: track.duration || 0,
    audiusTrackId: track.id,
  }
}

async function _fetchTracks(path) {
  const host = await getHost()
  const sep = path.includes('?') ? '&' : '?'
  const res = await fetch(`${host}${path}${sep}app_name=${APP_NAME}`)
  if (!res.ok) throw new Error(`Audius request failed: ${res.status}`)
  const { data = [] } = await res.json()
  return data.map(_mapTrack)
}

async function search(txt = '') {
  if (!txt.trim()) return getTrending()
  return _fetchTracks(`/v1/tracks/search?query=${encodeURIComponent(txt)}`)
}

async function getTrending() {
  const tracks = await _fetchTracks('/v1/tracks/trending')
  return tracks.slice(0, 20)
}

// The stream endpoint 302-redirects to the actual MP3; usable directly as an <audio src>.
async function getStreamUrl(trackId) {
  if (!trackId) return ''
  const host = await getHost()
  return `${host}/v1/tracks/${trackId}/stream?app_name=${APP_NAME}`
}
