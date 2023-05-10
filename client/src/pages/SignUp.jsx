import { useState } from 'react'

import useToken from '#Hooks/useToken.js'
import useErrors from '#Hooks/useErrors.js'

import { signUpUser } from '#Services/auth.js'

import Errors from '#Components/Errors.jsx'

export default function SignUp () {
  const { token, setToken, deleteToken } = useToken()
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
      const userToken = await signUpUser({ name, email, password, isArtist })

      setToken(userToken)
      setIsLogged(true)
      clearErrors()
    } catch (err) {
      setErrors(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = !name || !email || !password || isSubmitting

  const logOut = () => {
    deleteToken()
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
      <h1>Sign Up</h1>
      {errors && <Errors errors={errors} />}
      {isLogged && (
        <>
          <p>You are logged</p>
          <button onClick={logOut}>Log out</button>
        </>
      )}
      {!isLogged && (
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='name'>Name</label>
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
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='isArtist'>Artist</label>
            <input
              id='isArtist'
              type='checkbox'
              value={isArtist}
              onChange={handleChange}
            />
          </div>
          <button type='submit' disabled={isDisabled}>
            {isSubmitting ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
      )}
    </div>
  )
}
