import { useAuth } from '../context/AuthContext'
import './RequireAuth.css'

function RequireAuth({ children }) {
  const { user, loading, signInWithGoogle } = useAuth()

  if (loading) return null

  if (!user) {
    return (
      <div className="require-auth">
        <p>sign in to view and sync your meals</p>
        <button type="button" className="require-auth-button" onClick={signInWithGoogle}>
          sign in with google
        </button>
      </div>
    )
  }

  return children
}

export default RequireAuth
