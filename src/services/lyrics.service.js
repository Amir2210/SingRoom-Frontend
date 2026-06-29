// LRCLIB free lyrics API (no key, no rate limit): https://lrclib.net/docs
const BASE_URL = 'https://lrclib.net/api'

export const lyricsService = {
  getLyrics,
}

// Returns lyrics in the app's format: an array of lines, where each line is an
// array of word objects { lyrics, chords? }. LRCLIB has no chords, so words come
// without chords (curated chord data can still be merged elsewhere).
async function getLyrics({ title, artist, duration } = {}) {
  if (!title) return []

  let records = await _search({ track_name: title, artist_name: artist })
  if (!records.length) {
    // Fallback: broad keyword search across all fields.
    records = await _search({ q: [title, artist].filter(Boolean).join(' ') })
  }

  const best = _pickBest(records, duration)
  if (!best) return []

  const raw = best.plainLyrics || _stripTimestamps(best.syncedLyrics)
  return _toLines(raw)
}

async function _search(params) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v)
  ).toString()
  try {
    const res = await fetch(`${BASE_URL}/search?${query}`)
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function _pickBest(records, duration) {
  const withLyrics = records.filter((r) => !r.instrumental && (r.plainLyrics || r.syncedLyrics))
  if (!withLyrics.length) return null
  if (!duration) return withLyrics[0]
  // Prefer the record whose duration is closest to the track's duration.
  return withLyrics.reduce((best, cur) => {
    const curDiff = Math.abs((cur.duration || 0) - duration)
    const bestDiff = Math.abs((best.duration || 0) - duration)
    return curDiff < bestDiff ? cur : best
  })
}

function _stripTimestamps(synced = '') {
  return synced.replace(/\[\d+:\d+(?:\.\d+)?\]/g, '')
}

function _toLines(text = '') {
  return text.split('\n').map((line) => {
    const trimmed = line.trim()
    if (!trimmed) return []
    return trimmed.split(/\s+/).map((word) => ({ lyrics: word }))
  })
}
