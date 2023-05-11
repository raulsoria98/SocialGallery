import { useEffect, useState } from 'react'

import useErrors from '#Hooks/useErrors.js'
import useToken from '#Hooks/useToken.js'

import { getProfile } from '#Services/user.js'

import Errors from '#Components/Errors.jsx'
import ChangeUserNameForm from '#Components/ChangeUserNameForm.jsx'
import ChangeUserEmailForm from '#Components/ChangeUserEmailForm.jsx'
import ChangeUserPasswordForm from '#Components/ChangeUserPasswordForm.jsx'

export default function Profile () {
  const { errors, setErrors } = useErrors()
  const { token } = useToken()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
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
      setEmail(user.email)
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
          <h3>{name}</h3>
          <ChangeUserNameForm token={token} setName={setName} />
          <h3>{email}</h3>
          <ChangeUserEmailForm token={token} setEmail={setEmail} />
          <h3>Password</h3>
          <ChangeUserPasswordForm token={token} />
        </>
      )}
    </div>
  )
}
