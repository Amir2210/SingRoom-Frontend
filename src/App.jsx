import { Routes, Route } from 'react-router'
import { HomeIndex } from './pages/HomeIndex'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { SignUpAdmin } from './pages/SignUpAdmin'
import { WaitingRoom } from './pages/WaitingRoom'
import { AdminSearchSong } from './pages/AdminSearchSong'
import { LiveSong } from './pages/LiveSong'
import { RequireAuth } from './components/RequireAuth'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <main>
      <ToastContainer position='top-center' autoClose={2000} theme='dark' />
      <Routes>
        <Route path='/' element={<HomeIndex />} />
        <Route path='/login-page' element={<Login />} />
        <Route path='/sign-up-page' element={<SignUp />} />
        <Route path='/admin-sign-up-page' element={<SignUpAdmin />} />
        <Route path='/waiting-room-page' element={
          <RequireAuth><WaitingRoom /></RequireAuth>
        } />
        <Route path='/admin-search-song-page' element={
          <RequireAuth adminOnly><AdminSearchSong /></RequireAuth>
        } />
        <Route path='/live-song-page' element={
          <RequireAuth><LiveSong /></RequireAuth>
        } />
      </Routes>
    </main>
  )
}

export default App
