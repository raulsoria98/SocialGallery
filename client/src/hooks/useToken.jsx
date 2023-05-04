import { useState } from 'react'

export default function useToken () {
  const getToken = () => {
    const localToken = window.localStorage.getItem('token')

    const userToken = JSON.parse(localToken)

    return userToken?.jwt
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
