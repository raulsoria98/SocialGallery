import axiosClient from '#Config/axios.js'
import { useEffect, useState } from 'react'

export default function Profile () {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFydGlzdCIsImlhdCI6MTY4MjUyMTExMCwiZXhwIjoxNjgyNTQ5OTEwfQ.BiHZNgti_z6cpO3XRdrxrOFAwky4yX6d3kFUIMbuN8c'

  const getUser = async () => {
    try {
      const response = await axiosClient.get('/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser(response.data.user)
    } catch (error) {
      setErrors([error.message, ...error.response.data.errors])
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
        <ul style={{ color: 'red', listStyle: 'none' }}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      {!loading && !errors && (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </>
      )}
    </div>
  )
}
