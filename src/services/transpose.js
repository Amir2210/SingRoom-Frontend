const SHARP_SCALE = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const FLAT_TO_SHARP = { Ab: 'G#', Bb: 'A#', Cb: 'B', Db: 'C#', Eb: 'D#', Fb: 'E', Gb: 'F#' }

function transposeNote(note, semitones) {
  let normalized = FLAT_TO_SHARP[note] || note
  const idx = SHARP_SCALE.indexOf(normalized)
  if (idx === -1) return note
  const newIdx = (idx + semitones + 12 * 100) % 12
  return SHARP_SCALE[newIdx]
}

// Transposes a single token like "Cmaj7", "Em/D", "Bb", "C4/7".
function transposeChord(chord, semitones) {
  if (!chord || !semitones) return chord
  return chord
    .split('/')
    .map((part) => {
      const match = part.match(/^([A-G][#b]?)(.*)$/)
      if (!match) return part
      const [, root, suffix] = match
      return transposeNote(root, semitones) + suffix
    })
    .join('/')
}

// Returns a deep-ish copy of the song lyrics with all chords transposed.
export function transposeLyrics(lyrics = [], semitones = 0) {
  if (!semitones) return lyrics
  return lyrics.map((line) =>
    line.map((word) =>
      word.chords ? { ...word, chords: transposeChord(word.chords, semitones) } : word
    )
  )
}
