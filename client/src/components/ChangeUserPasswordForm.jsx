import { useState } from 'react'

import useErrors from '#Hooks/useErrors.js'

import { changeUserPassword } from '#Services/user.js'

import Errors from './Errors.jsx'

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
        <label htmlFor='password'>New Password:</label>
        <input
          id='password'
          type='password'
          value={newPassword}
          onChange={handleChange}
        />
        <button type='submit' disabled={isDisabled}>
          {isSubmitting ? 'Loading...' : 'Change password'}
        </button>
      </form>
    </div>
  )
}
