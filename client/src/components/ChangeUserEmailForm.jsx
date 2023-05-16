import { useState } from 'react'

import useErrors from '#Hooks/useErrors.js'

import { changeUserEmail } from '#Services/user.js'

import Errors from './Errors.jsx'

export default function ChangeUserEmailForm ({ token, setEmail }) {
  const { errors, setErrors, clearErrors } = useErrors()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newEmail, setNewEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await changeUserEmail({ email: newEmail, token })
      setEmail(newEmail)
      setNewEmail('')
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
        <label htmlFor='email'>New Email:</label>
        <input
          id='email'
          type='text'
          value={newEmail}
          onChange={handleChange}
        />
        <button type='submit' disabled={isDisabled}>
          {isSubmitting ? 'Loading...' : 'Change email'}
        </button>
      </form>
    </div>
  )
}
