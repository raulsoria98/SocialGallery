import { useEffect, useState } from 'react'

import useErrors from '#Hooks/useErrors.js'
import useToken from '#Hooks/useToken.js'

import { getProfile } from '#Services/user.js'

import Errors from '#Components/Errors.jsx'
import ChangeUserNameForm from '#Components/ChangeUserNameForm.jsx'

export default function Profile () {
  const { errors, setErrors } = useErrors()
  const { token } = useToken()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)

  const getUser = async () => {
    if (!token) {
      setErrors({ message: 'You must be logged' })
      setLoading(false)
      return
    }

    try {
      const user = await getProfile({ token })

      setName(user.name)
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
      {errors && <Errors errors={errors} />}
      {!loading && !errors && (
        <>
          <h3 className='username'>{name}</h3>
          <ChangeUserNameForm token={token} setName={setName} />
        </>
      )}
    </div>
  )
}
