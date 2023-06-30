import { useState } from 'react'

import useErrors from '#Hooks/useErrors.js'
import useAuth from '#Hooks/useAuth.js'

import { changeUserEmail } from '#Services/user.js'

import Errors from './Errors.jsx'
import WhiteTextField from './WhiteTextField.jsx'

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
        <WhiteTextField
          id='email'
          label='Nuevo email'
          variant='outlined'
          value={newEmail}
          onChange={handleChange}
          style={{ marginRight: '1rem', marginBottom: '1rem' }}
          size='small'
        />
        <button type='submit' disabled={isDisabled}>
          {isSubmitting ? 'Cargando...' : 'Cambiar email'}
        </button>
      </form>
    </div>
  )
}
