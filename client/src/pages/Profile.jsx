import useErrors from '#Hooks/useErrors.js'
import useToken from '#Hooks/useToken.js'
import { getProfile } from '#Services/user.js'
import { useEffect, useState } from 'react'

export default function Profile () {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const { errors, setErrors } = useErrors()
  const { token } = useToken()

  const getUser = async () => {
    if (!token) {
      setErrors({ message: 'You must be logged' })
      setLoading(false)
      return
    }

    try {
      const user = await getProfile({ token })

      setUser(user)
    } catch (error) {
      setErrors(error)
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
