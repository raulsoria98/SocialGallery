import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useErrors from '#Hooks/useErrors.js'
import useAuth from '#Hooks/useAuth.js'

import { loginUser } from '#Services/auth.js'

import WhiteTextField from '#Components/WhiteTextField.jsx'
import Errors from '#Components/Errors.jsx'
import { getProfile } from '#Services/user.js'

export default function Login () {
  const navigate = useNavigate()

  const { token, setAuth, deleteAuth } = useAuth()
  const { errors, setErrors, clearErrors } = useErrors()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLogged, setIsLogged] = useState(token)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { jwt } = await loginUser({ email, password })
      const user = await getProfile({ token: jwt })

      setAuth({ token: jwt, user })
      setIsLogged(true)
      clearErrors()
      navigate('/')
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = !email || !password || isSubmitting

  const logOut = () => {
    deleteAuth()
    setEmail('')
    setPassword('')
    setIsLogged(false)
  }

  const handleChange = (e) => {
    const { id, value } = e.target

    if (id === 'email') {
      setEmail(value)
    } else if (id === 'password') {
      setPassword(value)
    }
  }

  return (
    <div className='Login'>
      <h1>Iniciar sesión</h1>
      {errors && <Errors errors={errors} />}
      {isLogged && (
        <>
          <p>Ya tiene una sesión iniciada</p>
          <button onClick={logOut}>Cerrar sesión</button>
        </>
      )}
      {!isLogged && (
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <WhiteTextField
              id='email'
              label='Email'
              variant='outlined'
              value={email}
              onChange={handleChange}
              style={{ marginBottom: '1rem' }}
            />
          </div>
          <div className='form-control'>
            <WhiteTextField
              type='password'
              id='password'
              label='Contraseña'
              variant='outlined'
              value={password}
              onChange={handleChange}
              style={{ marginBottom: '1rem' }}
            />
          </div>
          <button type='submit' disabled={isDisabled}>
            {isSubmitting ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
      )}
    </div>
  )
}
