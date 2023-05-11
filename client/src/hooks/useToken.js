import { useState } from 'react'
import jwtDecode from 'jwt-decode'

export default function useToken () {
  const getToken = () => {
    const localToken = window.localStorage.getItem('token')

    const userToken = JSON.parse(localToken)

    const jwt = userToken?.jwt

    if (jwt) {
      const { exp } = jwtDecode(jwt)

      const currentTime = Date.now() / 1000

      if (exp < currentTime) {
        window.localStorage.removeItem('token')
        return null
      }
    }

    return jwt
  }

  const [token, setToken] = useState(getToken())

  const saveToken = userToken => {
    window.localStorage.setItem('token', JSON.stringify(userToken))

    setToken(userToken.token)
  }

  const deleteToken = () => {
    window.localStorage.removeItem('token')

    setToken(null)
  }

  return {
    setToken: saveToken,
    deleteToken,
    token
  }
}
