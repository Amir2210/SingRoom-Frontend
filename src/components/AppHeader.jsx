import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions'
import { toast } from 'react-toastify'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()

  async function onLogout() {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/')
    } catch (err) {
      toast.error('Failed to log out')
    }
  }

  return (
    <header className="app-header">
      <Link to={user ? '/' : '/'} className="brand">
        <span className="brand-logo">S</span>
        <span className="brand-name">SingRoom</span>
      </Link>

      {user && (
        <div className="flex items-center gap-3">
          <span className="user-chip">
            <span className="user-chip-dot" />
            {user.userName}
            {user.isAdmin && <span className="badge-admin">admin</span>}
          </span>
          <button onClick={onLogout} className="btn-ghost">
            Logout
          </button>
        </div>
      )}
    </header>
  )
}
