import useErrors from '#Hooks/useErrors.js'

import { changeUserIsArtist } from '#Services/user.js'
import { useState } from 'react'

import Errors from './Errors.jsx'

export default function ChangeUserIsAdminButton ({ token, previousIsArtist, setRole }) {
  const { errors, setErrors, clearErrors } = useErrors()
  const [isArtist, setIsArtist] = useState(previousIsArtist)

  const handleClick = async () => {
    try {
      const { role } = await changeUserIsArtist({ token, isArtist: !isArtist })
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
      <button onClick={handleClick}>{isArtist ? 'Change to User' : 'Change to Artist'}</button>
    </div>
  )
}
