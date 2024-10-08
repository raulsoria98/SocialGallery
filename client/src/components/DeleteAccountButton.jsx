import { useNavigate } from 'react-router-dom'
import useErrors from '#Hooks/useErrors.js'
import useAuth from '#Hooks/useAuth.js'
import { deleteAccount } from '#Services/user.js'
import Errors from './Errors.jsx'

export default function DeleteAccountButton ({ token }) {
  const { deleteAuth } = useAuth()
  const { errors, setErrors } = useErrors()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await deleteAccount({ token })
      deleteAuth()
      navigate('/')
    } catch (err) {
      setErrors(err)
    }
  }

  return (
    <div className='delete-account-form' style={{ marginTop: '2rem' }}>
      {errors && <Errors errors={errors} />}
      <button className='delete-button' onClick={handleClick}>Eliminar cuenta</button>
    </div>
  )
}
