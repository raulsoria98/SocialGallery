import { useState } from 'react'

import useErrors from '#Hooks/useErrors.js'

import { changeUserPassword } from '#Services/user.js'

import Errors from './Errors.jsx'
import WhiteTextField from './WhiteTextField.jsx'

export default function ChangeUserPasswordForm ({ token }) {
  const { errors, setErrors, clearErrors } = useErrors()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await changeUserPassword({ password: newPassword, token })
      setNewPassword('')
      clearErrors()
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = !newPassword || isSubmitting

  const handleChange = (e) => {
    const { value } = e.target

    setNewPassword(value)
  }

  return (
    <div className='change-password'>
      {errors && <Errors errors={errors} />}
      <form className='change-password-form' onSubmit={handleSubmit}>
        <WhiteTextField
          id='password'
          label='Nueva contraseña'
          variant='outlined'
          value={newPassword}
          onChange={handleChange}
          style={{ marginRight: '1rem', marginBottom: '1rem' }}
          size='small'
        />
        <button type='submit' disabled={isDisabled}>
          {isSubmitting ? 'Cargando...' : 'Cambiar contraseña'}
        </button>
      </form>
    </div>
  )
}
