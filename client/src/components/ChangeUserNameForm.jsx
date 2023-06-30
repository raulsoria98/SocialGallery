import { useState } from 'react'

import useErrors from '#Hooks/useErrors.js'
import useAuth from '#Hooks/useAuth.js'

import { changeUserName } from '#Services/user.js'

import Errors from './Errors.jsx'
import WhiteTextField from './WhiteTextField.jsx'

export default function ChangeUserNameForm ({ token, setName }) {
  const { errors, setErrors, clearErrors } = useErrors()
  const { user, setUser } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newName, setNewName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await changeUserName({ name: newName, token })
      setName(newName)
      setNewName('')
      setUser({ user: { ...user, name: newName } })
      clearErrors()
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = !newName || isSubmitting

  const handleChange = (e) => {
    const { value } = e.target

    setNewName(value)
  }

  return (
    <div className='change-name'>
      {errors && <Errors errors={errors} />}
      <form className='change-name-form' onSubmit={handleSubmit}>
        <WhiteTextField
          id='name'
          label='Nuevo nombre'
          variant='outlined'
          value={newName}
          onChange={handleChange}
          style={{ marginRight: '1rem', marginBottom: '1rem' }}
          size='small'
        />
        <button type='submit' disabled={isDisabled}>
          {isSubmitting ? 'Cargando...' : 'Cambiar nombre'}
        </button>
      </form>
    </div>
  )
}
