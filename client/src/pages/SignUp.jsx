import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '#Hooks/useAuth.js'
import useErrors from '#Hooks/useErrors.js'

import { signUpUser } from '#Services/auth.js'
import { getProfile } from '#Services/user.js'

import Errors from '#Components/Errors.jsx'

export default function SignUp () {
  const navigate = useNavigate()

  const { token, setAuth, deleteAuth } = useAuth()
  const { errors, setErrors, clearErrors } = useErrors()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isArtist, setIsArtist] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLogged, setIsLogged] = useState(token)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { jwt } = await signUpUser({ name, email, password, isArtist })
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

  const isDisabled = !name || !email || !password || isSubmitting

  const logOut = () => {
    deleteAuth()
    setName('')
    setEmail('')
    setPassword('')
    setIsLogged(false)
  }

  const handleChange = (e) => {
    const { id, value } = e.target

    if (id === 'name') {
      setName(value)
    } else if (id === 'email') {
      setEmail(value)
    } else if (id === 'password') {
      setPassword(value)
    } else if (id === 'isArtist') {
      setIsArtist(!isArtist)
    }
  }

  return (
    <div className='SignUp'>
      <h1>Registrarse</h1>
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
            <label htmlFor='name'>Nombre</label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password'>Contraseña</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='isArtist'>Artista</label>
            <input
              id='isArtist'
              type='checkbox'
              value={isArtist}
              onChange={handleChange}
            />
          </div>
          <button type='submit' disabled={isDisabled}>
            {isSubmitting ? 'Cargando...' : 'Crear cuenta'}
          </button>
        </form>
      )}
    </div>
  )
}
