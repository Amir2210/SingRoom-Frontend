import { Link, useNavigate } from 'react-router'
import { login } from '../store/actions/user.actions'
import { useState } from 'react'
import { toast } from 'react-toastify'

function getEmptyCredentials() {
  return { username: '', password: '' }
}

export function Login() {
  const [credentials, setCredentials] = useState(getEmptyCredentials())
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  function handleCredentialsChange(ev) {
    const { name, value } = ev.target
    setCredentials((credentials) => ({ ...credentials, [name]: value }))
  }

  async function onLogin(ev) {
    ev.preventDefault()
    setIsLoading(true)
    try {
      const user = await login(credentials)
      if (user.isAdmin) {
        toast.success("Welcome back, admin")
        navigate('/admin-search-song-page')
      } else {
        navigate('/waiting-room-page')
      }
    } catch (err) {
      toast.error('Invalid username or password')
    } finally {
      setIsLoading(false)
    }
  }

  const { username, password } = credentials
  return (
    <section className="page flex flex-col items-center justify-center px-5 py-10">
      <form onSubmit={onLogin} className="glass-card w-full max-w-md animate-rise">
        <Link to="/" className="mb-6 flex items-center justify-center gap-3">
          <span className="brand-logo">S</span>
          <span className="brand-name">SingRoom</span>
        </Link>
        <h1 className="mb-1 text-center text-3xl font-bold">Welcome back</h1>
        <p className="mb-7 text-center text-zinc-400">Log in to join the rehearsal</p>

        <label className="field mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input type="text" placeholder="Username" name="username" value={username} onChange={handleCredentialsChange} required />
        </label>

        <label className="field mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input type="password" placeholder="Password" name="password" value={password} onChange={handleCredentialsChange} required />
        </label>

        <button className="btn-primary w-full" disabled={isLoading}>
          {isLoading ? 'Logging in…' : 'Log in'}
        </button>

        <p className="mt-6 text-center text-zinc-400">
          Not a member yet? <Link className="link-accent" to="/sign-up-page">Register</Link>
        </p>
      </form>
    </section>
  )
}
