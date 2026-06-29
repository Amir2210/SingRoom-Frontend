import { audiusService } from './audius.service'
import { lyricsService } from './lyrics.service'

// Orchestrates song search (Audius) and enrichment (lyrics from LRCLIB + audio
// stream from Audius). Keeps a small, stable surface for the UI to consume.
export const songService = {
  query,
  enrich,
}

async function query(txt = '') {
  return audiusService.search(txt)
}

// Attaches playable audio + lyrics to a search result so it's ready to go live.
async function enrich(song) {
  const [lyrics, audioUrl] = await Promise.all([
    lyricsService.getLyrics({
      title: song.title,
      artist: song.artist,
      duration: song.duration,
    }),
    audiusService.getStreamUrl(song.audiusTrackId || song._id),
  ])

  return { ...song, lyrics, audioUrl }
}
