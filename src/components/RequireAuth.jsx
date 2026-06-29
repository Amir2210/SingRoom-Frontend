import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

export function RequireAuth({ children, adminOnly = false }) {
  const user = useSelector((storeState) => storeState.userModule.user)

  if (!user) return <Navigate to="/login-page" replace />
  if (adminOnly && !user.isAdmin) return <Navigate to="/waiting-room-page" replace />

  return children
}
