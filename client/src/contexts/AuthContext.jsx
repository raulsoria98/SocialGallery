import jwtDecode from 'jwt-decode'
import { useState, createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const getAuthFromLocalStorage = () => {
    const token = window.localStorage.getItem('token')
    const user = window.localStorage.getItem('user')

    if (!token || !user) {
      return {}
    }

    const { exp } = jwtDecode(token)

    const currentTime = Date.now() / 1000

    if (exp < currentTime) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      return {}
    }

    const parsedUser = JSON.parse(user)

    return { token, user: parsedUser }
  }

  const [session, setSession] = useState(getAuthFromLocalStorage())

  const setAuth = ({ user, token }) => {
    setSession({ user, token })
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  const deleteAuth = () => {
    setSession({})
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
  }

  const setUser = ({ user }) => {
    setSession({ ...session, user })
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  const { user, token } = session

  return (
    <AuthContext.Provider value={{ user, token, setAuth, deleteAuth, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
