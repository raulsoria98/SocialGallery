import { useState } from 'react'

import useErrors from '#Hooks/useErrors.js'
import useAuth from '#Hooks/useAuth.js'

import { changeUserEmail } from '#Services/user.js'

import Errors from './Errors.jsx'

export default function ChangeUserEmailForm ({ token, setEmail }) {
  const { errors, setErrors, clearErrors } = useErrors()
  const { user, setUser } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newEmail, setNewEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await changeUserEmail({ email: newEmail, token })
      setEmail(newEmail)
      setNewEmail('')
      setUser({ user: { ...user, email: newEmail } })
      clearErrors()
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = !newEmail || isSubmitting

  const handleChange = (e) => {
    const { value } = e.target

    setNewEmail(value)
  }

  return (
    <div className='change-email'>
      {errors && <Errors errors={errors} />}
      <form className='change-email-form' onSubmit={handleSubmit}>
        <label htmlFor='email'>Nuevo Email:</label>
        <input
          id='email'
          type='text'
          value={newEmail}
          onChange={handleChange}
        />
        <button type='submit' disabled={isDisabled}>
          {isSubmitting ? 'Cargando...' : 'Cambiar email'}
        </button>
      </form>
    </div>
  )
}
