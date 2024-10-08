import { useEffect, useState } from 'react'

import useErrors from '#Hooks/useErrors.js'
import useAuth from '#Hooks/useAuth.js'

import userRoles from '#Enums/userRoles.js'

import Errors from '#Components/Errors.jsx'
import ChangeUserNameForm from '#Components/ChangeUserNameForm.jsx'
import ChangeUserEmailForm from '#Components/ChangeUserEmailForm.jsx'
import ChangeUserPasswordForm from '#Components/ChangeUserPasswordForm.jsx'
import ChangeUserIsArtistButton from '#Components/ChangeUserIsArtistButton.jsx'
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
      <h1>Perfil</h1>
      {loading && <p>Cargando...</p>}
      {errors && <Errors errors={errors} />}
      {!loading && !errors && (
        <>
          <h3>{name}</h3>
          <ChangeUserNameForm token={token} setName={setName} />
          <h3 style={{ marginTop: '2rem' }}>{email}</h3>
          <ChangeUserEmailForm token={token} setEmail={setEmail} />
          <h3 style={{ marginTop: '2rem' }}>Contraseña</h3>
          <ChangeUserPasswordForm token={token} />
          <h3 style={{ marginTop: '2rem' }}>Rol de usuario</h3>
          <p>{role.charAt(0).toUpperCase() + role.slice(1)}</p>
          {role !== userRoles.ADMIN && <ChangeUserIsArtistButton token={token} previousIsArtist={role === userRoles.ARTIST} setRole={setRole} />}
          <DeleteAccountButton token={token} />
        </>
      )}
    </div>
  )
}
