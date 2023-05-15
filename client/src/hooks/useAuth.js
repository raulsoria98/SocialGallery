import { AuthContext } from '#Contexts/AuthContext.jsx'
import { useContext } from 'react'

export default function useAuth () {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return auth
}
