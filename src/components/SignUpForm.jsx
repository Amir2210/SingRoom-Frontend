import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { login, signup } from '../store/actions/user.actions'
import { toast } from 'react-toastify'
import { INSTRUMENTS } from '../data/instruments'

export function SignUpForm({ isAdmin = false }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    instrument: INSTRUMENTS[0],
    isAdmin,
  })
  const [errors, setErrors] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  function handleCredentialsChange(ev) {
    const { name, value } = ev.target
    let errorMessage = ''
    if (name === 'username') {
      if (!/^[a-zA-Z0-9_]{3,15}$/.test(value)) {
        errorMessage = 'Username must be 3-15 characters (letters, numbers only).'
      }
    } else if (name === 'password') {
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_]{4,15}$/.test(value)) {
        errorMessage = 'Password must be 4-15 chars and mix letters & numbers.'
      }
    }
    setErrors((prev) => ({ ...prev, [name]: errorMessage }))
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    if (errors.username || errors.password || !credentials.username || !credentials.password) {
      toast.error('Please correct the errors before submitting.')
      return
    }
    setIsLoading(true)
    try {
      await signup(credentials)
      await login(credentials)
      toast.success(`Welcome, ${credentials.username}!`)
      navigate(isAdmin ? '/admin-search-song-page' : '/waiting-room-page')
    } catch (err) {
      toast.error('Failed to create user, try again later')
    } finally {
      setIsLoading(false)
    }
  }

  const { username, password, instrument } = credentials
  return (
    <section className="page flex flex-col items-center justify-center px-5 py-10">
      <form onSubmit={onSubmit} className="glass-card w-full max-w-md animate-rise">
        <Link to="/" className="mb-6 flex items-center justify-center gap-3">
          <span className="brand-logo">S</span>
          <span className="brand-name">SingRoom</span>
        </Link>
        <h1 className="mb-1 text-center text-3xl font-bold">
          {isAdmin ? 'Create admin account' : 'Join the band'}
        </h1>
        <p className="mb-7 text-center text-zinc-400">
          {isAdmin ? 'Admins control the song for everyone' : 'Pick your instrument and play along'}
        </p>

        <label className="field">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
          <input type="text" placeholder="Username" name="username" value={username} onChange={handleCredentialsChange} required />
        </label>
        {errors.username && <p className="mb-2 mt-1 text-sm text-red-400">{errors.username}</p>}

        <label className="field mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
          <input type="password" placeholder="Password" name="password" value={password} onChange={handleCredentialsChange} required />
        </label>
        {errors.password && <p className="mb-2 mt-1 text-sm text-red-400">{errors.password}</p>}

        <label className="mb-2 mt-5 block text-sm font-medium capitalize text-zinc-300" htmlFor="instrument">Instrument</label>
        <select id="instrument" name="instrument" value={instrument} onChange={handleCredentialsChange} className="select-field capitalize">
          {INSTRUMENTS.map((inst) => (
            <option key={inst} value={inst}>{inst}</option>
          ))}
        </select>

        <button className="btn-primary mt-6 w-full" disabled={isLoading}>
          {isLoading ? 'Creating…' : 'Register'}
        </button>

        <p className="mt-6 text-center text-zinc-400">
          {isAdmin ? (
            <>Not an admin? <Link className="link-accent" to="/sign-up-page">Regular sign up</Link></>
          ) : (
            <>Setting up the band? <Link className="link-accent" to="/admin-sign-up-page">Register as admin</Link></>
          )}
        </p>
        <p className="mt-2 text-center text-zinc-400">
          Already have an account? <Link className="link-accent" to="/login-page">Log in</Link>
        </p>
      </form>
    </section>
  )
}
