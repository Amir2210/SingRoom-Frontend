# 🎵 SingRoom
**Real-Time Collaborative Music Rehearsal Platform**

SingRoom is a **web application** that enables musicians to **rehearse together remotely**. Users can log in, select their instrument, and join a session where an **admin user controls the song selection and display**. The platform synchronizes song lyrics and chords in real time, ensuring a seamless rehearsal experience.

## 🚀 Features
- ✅ **User Authentication** – Log in and register as a musician (JWT over HTTP-only cookies).
- ✅ **Instrument Selection** – Choose your instrument when signing up.
- ✅ **Admin-Controlled Sessions** – The admin can create and manage rehearsal sessions.
- ✅ **Song Search & Selection** – Search the free **Audius** catalog by title or artist and pick a track for the session.
- ✅ **Real-Time Synchronization** – All users are pushed to the selected song's **lyrics & chords** live via Socket.io; refresh/late-join re-syncs automatically.
- ✅ **Dynamic Display**:
  - **Instrumentalists** see both **chords & lyrics**.
  - **Singers** see **lyrics only**.
- ✅ **Transpose & RTL** – Shift chords by semitones, with automatic right-to-left rendering for **Hebrew** lyrics.
- ✅ **Music Playback** – Listen to the track while playing along (auto-play with a one-tap fallback).
- ✅ **Live Participants** – See who's in the room in real time.
- ✅ **Demo Accounts** – Jump in instantly with `admin / admin123` or `singer / singer123`.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Redux, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Real-Time Communication**: Socket.io
- **Song Data**: Audius (search + audio streaming) & LRCLIB (lyrics) — free public APIs, no key needed
- **Authentication**: Cookies, JWT
- **State Management**: Redux

## 🏃 Getting Started
> Requires the **[JaMoveo Backend](../JaMoveo%20Backend)** running locally (defaults to `http://localhost:3031`).

```bash
npm install     # install dependencies
npm run dev     # start the Vite dev server
npm run build   # build for production (also copies the build into the backend's public/ folder)
```

No environment variables are required — the Audius and LRCLIB APIs are keyless.
