// Local song library used by the song service for offline / backend-less search.
// Shape matches what the app's components expect: { _id, title, artist, imgUrl, language, lyrics }
// where `lyrics` is an array of lines, and each line is an array of { lyrics, chords? } words.

const BEATLES_IMG =
  "https://res.cloudinary.com/dxm0sqcfp/image/upload/v1742748522/jamoveo/the_beatels_zwtpta.png"
const HEBREW_IMG =
  "https://res.cloudinary.com/dxm0sqcfp/image/upload/v1742747780/jamoveo/%D7%90%D7%A8%D7%99%D7%90%D7%9C_%D7%96%D7%99%D7%9C%D7%91%D7%A8_ywojo6.png"

export const songsData = [
  {
    _id: "6a414a02919e9fdf6f4d4574",
    title: "Hey Jude",
    artist: "The Beatles",
    language: "en",
    imgUrl: BEATLES_IMG,
    lyrics: [
      [{ lyrics: "Hey" }, { lyrics: "Jude", chords: "F" }, { lyrics: "don't" }, { lyrics: "make" }, { lyrics: "it" }, { lyrics: "bad", chords: "C" }],
      [{ lyrics: "Take" }, { lyrics: "a" }, { lyrics: "sad", chords: "C7" }, { lyrics: "song", chords: "C4/7" }, { lyrics: "and" }, { lyrics: "make" }, { lyrics: "it" }, { lyrics: "better", chords: "F" }],
      [{ lyrics: "Remember", chords: "Bb" }, { lyrics: "to" }, { lyrics: "let" }, { lyrics: "her" }, { lyrics: "into" }, { lyrics: "your" }, { lyrics: "heart", chords: "F" }],
      [{ lyrics: "Then" }, { lyrics: "you" }, { lyrics: "can" }, { lyrics: "start", chords: "C" }, { lyrics: "to" }, { lyrics: "make", chords: "C7" }, { lyrics: "it" }, { lyrics: "better", chords: "F" }],
      [{ lyrics: "Hey" }, { lyrics: "Jude", chords: "F" }, { lyrics: "don't" }, { lyrics: "be" }, { lyrics: "afraid", chords: "C" }],
      [{ lyrics: "You" }, { lyrics: "were" }, { lyrics: "made" }, { lyrics: "to" }, { lyrics: "go" }, { lyrics: "out" }, { lyrics: "and" }, { lyrics: "get", chords: "C7" }, { lyrics: "her" }],
      [{ lyrics: "The" }, { lyrics: "minute" }, { lyrics: "you" }, { lyrics: "let" }, { lyrics: "her" }, { lyrics: "under" }, { lyrics: "your" }, { lyrics: "skin", chords: "F" }],
      [{ lyrics: "Then" }, { lyrics: "you" }, { lyrics: "begin" }, { lyrics: "to" }, { lyrics: "make" }, { lyrics: "it" }, { lyrics: "better", chords: "C" }],
      [{ lyrics: "And" }, { lyrics: "anytime" }, { lyrics: "you" }, { lyrics: "feel" }, { lyrics: "the" }, { lyrics: "pain", chords: "C7" }, { lyrics: "hey" }, { lyrics: "Jude", chords: "F" }, { lyrics: "refrain" }],
      [{ lyrics: "Don't" }, { lyrics: "carry" }, { lyrics: "the" }, { lyrics: "world" }, { lyrics: "upon" }, { lyrics: "your" }, { lyrics: "shoulders", chords: "Bb" }],
      [{ lyrics: "Na" }, { lyrics: "na" }, { lyrics: "na" }, { lyrics: "na", chords: "F" }, { lyrics: "na" }, { lyrics: "na" }, { lyrics: "na", chords: "C" }],
    ],
  },
  {
    _id: "6a414a02919e9fdf6f4d4575",
    title: "ואיך שלא",
    artist: "אריאל זילבר",
    language: "he",
    imgUrl: HEBREW_IMG,
    lyrics: [
      [{ lyrics: "ואיך" }, { lyrics: "שלא", chords: "Em" }, { lyrics: "אפנה" }, { lyrics: "לראות", chords: "Em/D" }],
      [{ lyrics: "תמיד" }, { lyrics: "איתה", chords: "Cmaj7" }, { lyrics: "ארצה" }, { lyrics: "להיות", chords: "G" }],
      [{ lyrics: "שומרת" }, { lyrics: "לי", chords: "Em" }, { lyrics: "היא" }, { lyrics: "אמונים", chords: "Em/D" }],
      [{ lyrics: "לא" }, { lyrics: "מתרוצצת", chords: "Cmaj7" }, { lyrics: "בגנים", chords: "G" }],
      [{ lyrics: "וגם" }, { lyrics: "אני" }, { lyrics: "בין", chords: "Em" }, { lyrics: "הבריות" }],
      [{ lyrics: "לא" }, { lyrics: "מתפתה", chords: "Cmaj7" }, { lyrics: "לאחרות", chords: "G" }],
      [{ lyrics: "גלים" }, { lyrics: "עולים", chords: "E" }, { lyrics: "חולות" }, { lyrics: "נעים", chords: "Em/D" }],
      [{ lyrics: "אוושת" }, { lyrics: "הרוח", chords: "Cmaj7" }, { lyrics: "בעלים", chords: "G" }],
    ],
  },
  {
    _id: "6a414a02919e9fdf6f4d4576",
    title: "Let It Be",
    artist: "The Beatles",
    language: "en",
    imgUrl: BEATLES_IMG,
    lyrics: [
      [{ lyrics: "When", chords: "C" }, { lyrics: "I" }, { lyrics: "find", chords: "G" }, { lyrics: "myself" }, { lyrics: "in", chords: "Am" }, { lyrics: "times" }, { lyrics: "of", chords: "F" }, { lyrics: "trouble" }],
      [{ lyrics: "Mother", chords: "C" }, { lyrics: "Mary", chords: "G" }, { lyrics: "comes", chords: "F" }, { lyrics: "to", chords: "C" }, { lyrics: "me" }],
      [{ lyrics: "Speaking", chords: "C" }, { lyrics: "words", chords: "G" }, { lyrics: "of", chords: "Am" }, { lyrics: "wisdom", chords: "F" }],
      [{ lyrics: "Let", chords: "C" }, { lyrics: "it", chords: "G" }, { lyrics: "be", chords: "F" }, { lyrics: "", chords: "C" }],
      [{ lyrics: "And", chords: "Am" }, { lyrics: "in" }, { lyrics: "my", chords: "G" }, { lyrics: "hour" }, { lyrics: "of", chords: "F" }, { lyrics: "darkness", chords: "C" }],
      [{ lyrics: "She", chords: "C" }, { lyrics: "is" }, { lyrics: "standing", chords: "G" }, { lyrics: "right" }, { lyrics: "in", chords: "F" }, { lyrics: "front", chords: "C" }, { lyrics: "of" }, { lyrics: "me" }],
      [{ lyrics: "Whisper", chords: "C" }, { lyrics: "words", chords: "G" }, { lyrics: "of", chords: "Am" }, { lyrics: "wisdom", chords: "F" }],
      [{ lyrics: "Let", chords: "C" }, { lyrics: "it", chords: "G" }, { lyrics: "be", chords: "F" }, { lyrics: "", chords: "C" }],
    ],
  },
  {
    _id: "6a414a02919e9fdf6f4d4577",
    title: "Imagine",
    artist: "John Lennon",
    language: "en",
    imgUrl: BEATLES_IMG,
    lyrics: [
      [{ lyrics: "Imagine", chords: "C" }, { lyrics: "there's", chords: "Cmaj7" }, { lyrics: "no", chords: "F" }, { lyrics: "heaven" }],
      [{ lyrics: "It's", chords: "C" }, { lyrics: "easy", chords: "Cmaj7" }, { lyrics: "if", chords: "F" }, { lyrics: "you" }, { lyrics: "try" }],
      [{ lyrics: "No", chords: "C" }, { lyrics: "hell", chords: "Cmaj7" }, { lyrics: "below", chords: "F" }, { lyrics: "us" }],
      [{ lyrics: "Above", chords: "C" }, { lyrics: "us", chords: "Cmaj7" }, { lyrics: "only", chords: "F" }, { lyrics: "sky" }],
      [{ lyrics: "Imagine", chords: "F" }, { lyrics: "all", chords: "Am" }, { lyrics: "the", chords: "Dm" }, { lyrics: "people", chords: "F" }],
      [{ lyrics: "Living", chords: "G" }, { lyrics: "for", chords: "C" }, { lyrics: "today" }],
    ],
  },
  {
    _id: "6a414a02919e9fdf6f4d4578",
    title: "Knockin' on Heaven's Door",
    artist: "Bob Dylan",
    language: "en",
    imgUrl: BEATLES_IMG,
    lyrics: [
      [{ lyrics: "Mama", chords: "G" }, { lyrics: "take", chords: "D" }, { lyrics: "this", chords: "Am" }, { lyrics: "badge", chords: "Am" }, { lyrics: "off", chords: "Am" }, { lyrics: "of", chords: "Am" }, { lyrics: "me" }],
      [{ lyrics: "I", chords: "G" }, { lyrics: "can't", chords: "D" }, { lyrics: "use", chords: "C" }, { lyrics: "it", chords: "C" }, { lyrics: "anymore", chords: "C" }],
      [{ lyrics: "It's", chords: "G" }, { lyrics: "gettin'", chords: "D" }, { lyrics: "dark", chords: "Am" }, { lyrics: "too", chords: "Am" }, { lyrics: "dark", chords: "Am" }, { lyrics: "to", chords: "Am" }, { lyrics: "see" }],
      [{ lyrics: "Feels", chords: "G" }, { lyrics: "like", chords: "D" }, { lyrics: "I'm", chords: "C" }, { lyrics: "knockin'", chords: "C" }, { lyrics: "on", chords: "C" }, { lyrics: "heaven's", chords: "C" }, { lyrics: "door" }],
      [{ lyrics: "Knock", chords: "G" }, { lyrics: "knock", chords: "D" }, { lyrics: "knockin'", chords: "Am" }, { lyrics: "on" }, { lyrics: "heaven's" }, { lyrics: "door" }],
    ],
  },
  {
    _id: "6a414a02919e9fdf6f4d4579",
    title: "עוד יום",
    artist: "כוורת",
    language: "he",
    imgUrl: HEBREW_IMG,
    lyrics: [
      [{ lyrics: "עוד", chords: "Am" }, { lyrics: "יום" }, { lyrics: "יבוא", chords: "Dm" }],
      [{ lyrics: "והכל", chords: "G" }, { lyrics: "יהיה", chords: "C" }, { lyrics: "מואר" }],
      [{ lyrics: "נשב", chords: "Am" }, { lyrics: "ביחד", chords: "Dm" }],
      [{ lyrics: "ונראה", chords: "G" }, { lyrics: "את", chords: "C" }, { lyrics: "האור" }],
    ],
  },
]
