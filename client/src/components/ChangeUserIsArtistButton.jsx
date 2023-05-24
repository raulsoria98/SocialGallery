import useErrors from '#Hooks/useErrors.js'
import useAuth from '#Hooks/useAuth.js'

import { changeUserIsArtist } from '#Services/user.js'
import { useState } from 'react'

import Errors from './Errors.jsx'

export default function ChangeUserIsArtistButton ({ token, previousIsArtist, setRole }) {
  const { errors, setErrors, clearErrors } = useErrors()
  const { user, setUser } = useAuth()
  const [isArtist, setIsArtist] = useState(previousIsArtist)

  const handleClick = async () => {
    try {
      const { role } = await changeUserIsArtist({ token, isArtist: !isArtist })
      setUser({ user: { ...user, role } })
      setRole(role)
      setIsArtist(!isArtist)
      clearErrors()
    } catch (err) {
      setErrors(err)
    }
  }

  return (
    <div className='change-isArtist-form'>
      {errors && <Errors errors={errors} />}
      <button onClick={handleClick}>{isArtist ? 'Dejar de ser artista' : 'Ser artista'}</button>
    </div>
  )
}
