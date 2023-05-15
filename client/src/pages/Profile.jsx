import { useEffect, useState } from 'react'

import useErrors from '#Hooks/useErrors.js'
import useAuth from '#Hooks/useAuth.js'

import userRoles from '#Enums/userRoles.js'

import Errors from '#Components/Errors.jsx'
import ChangeUserNameForm from '#Components/ChangeUserNameForm.jsx'
import ChangeUserEmailForm from '#Components/ChangeUserEmailForm.jsx'
import ChangeUserPasswordForm from '#Components/ChangeUserPasswordForm.jsx'
import ChangeUserIsAdminButton from '#Components/ChangeUserIsAdminButton.jsx'
import DeleteAccountButton from '#Components/DeleteAccountButton.jsx'

export default function Profile () {
  const { errors, setErrors } = useErrors()
  const { user, token } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(true)

  const getUser = async () => {
    if (!user) {
      setErrors({ message: 'You must be logged' })
      setLoading(false)
      return
    }

    try {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
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
          <h3>Role</h3>
          <p>{role.charAt(0).toUpperCase() + role.slice(1)}</p>
          {role !== userRoles.ADMIN && <ChangeUserIsAdminButton token={token} previousIsArtist={role === userRoles.ARTIST} setRole={setRole} />}
          <DeleteAccountButton token={token} />
        </>
      )}
    </div>
  )
}
