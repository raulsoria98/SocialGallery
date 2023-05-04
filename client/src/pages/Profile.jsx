import axiosClient from '#Config/axios.js'
import useToken from '#Hooks/useToken.jsx'
import { useEffect, useState } from 'react'

export default function Profile () {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)
  const { token } = useToken()

  const getUser = async () => {
    if (!token) {
      setErrors(['You must be logged'])
      setLoading(false)
      return
    }

    try {
      const response = await axiosClient.get('/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser(response.data.user)
    } catch (error) {
      if (error.response) {
        setErrors([error.message, ...error.response.data.errors])
      } else {
        setErrors([error.message])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='Profile'>
      <h1>Profile</h1>
      {loading && <p>Loading...</p>}
      {errors && (
        <ul className='errors-ul'>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      {!loading && !errors && (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </>
      )}
    </div>
  )
}
