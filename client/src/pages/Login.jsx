import { useState } from 'react'

import useToken from '#Hooks/useToken.js'
import useErrors from '#Hooks/useErrors.js'

import { loginUser } from '#Services/auth.js'

export default function Login () {
  const { token, setToken, deleteToken } = useToken()
  const { errors, setErrors, clearErrors } = useErrors()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLogged, setIsLogged] = useState(token)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const userToken = await loginUser({ email, password })

      setToken(userToken)
      setIsLogged(true)
      clearErrors()
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = !email || !password || isSubmitting

  const logOut = () => {
    deleteToken()
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
      <h1>Login</h1>
      {isLogged && (
        <>
          <p>You are logged</p>
          <button onClick={logOut}>Log out</button>
        </>
      )}
      {!isLogged && (
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type='submit' disabled={isDisabled}>
            {isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </form>
      )}
      {errors && (
        <div className='errors'>
          <h3>Errors</h3>
          <ul className='errors-ul'>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
