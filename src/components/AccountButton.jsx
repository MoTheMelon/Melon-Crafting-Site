import { useAuth } from '../context/AuthContext'
import './AccountButton.css'

function AccountButton() {
  const { user, loading, signInWithGoogle, signOutUser } = useAuth()

  if (loading) return null

  if (!user) {
    return (
      <button type="button" className="account-button account-signin" onClick={signInWithGoogle}>
        sign in with google
      </button>
    )
  }

  return (
    <button
      type="button"
      className="account-button account-avatar"
      onClick={signOutUser}
      aria-label={`sign out (${user.displayName || user.email})`}
      title={`sign out (${user.displayName || user.email})`}
    >
      {user.photoURL ? (
        <img src={user.photoURL} alt="" />
      ) : (
        <span className="account-avatar-fallback">
          {(user.displayName || user.email || '?')[0].toUpperCase()}
        </span>
      )}
    </button>
  )
}

export default AccountButton
