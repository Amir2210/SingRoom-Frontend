import { useMemo } from 'react'
import { transposeLyrics } from '../services/transpose'

export function SongLyrics({ song = [], userInstrument, transpose = 0, fontSize = 20 }) {
  const isHebrew = useMemo(
    () => song.some((line) => line.some((word) => /[\u0590-\u05FF]/.test(word.lyrics || ''))),
    [song]
  )

  const lines = useMemo(() => transposeLyrics(song, transpose), [song, transpose])
  const showChords = userInstrument !== 'vocals'

  return (
    <div
      dir={isHebrew ? 'rtl' : 'ltr'}
      className="leading-loose"
      style={{ fontSize: `${fontSize}px` }}
    >
      {lines.map((line, lineIndex) => (
        <p key={lineIndex} className="mb-4 flex flex-wrap gap-x-3 gap-y-1">
          {line.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-flex flex-col items-center">
              {showChords && (
                <span
                  className="font-bold leading-none secondary-txt"
                  style={{ fontSize: `${Math.round(fontSize * 0.85)}px`, minHeight: word.chords ? undefined : '1em' }}
                >
                  {word.chords || '\u00A0'}
                </span>
              )}
              <span className="text-zinc-100">{word.lyrics}</span>
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}
