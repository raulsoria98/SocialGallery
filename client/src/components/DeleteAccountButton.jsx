import { useNavigate } from 'react-router-dom'
import useErrors from '#Hooks/useErrors.js'
import useToken from '#Hooks/useToken.js'
import { deleteAccount } from '#Services/user.js'
import Errors from './Errors.jsx'

export default function DeleteAccountButton ({ token }) {
  const { deleteToken } = useToken()
  const { errors, setErrors } = useErrors()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await deleteAccount({ token })
      deleteToken()
      navigate('/')
    } catch (err) {
      setErrors(err)
    }
  }

  return (
    <div className='delete-account-form'>
      {errors && <Errors errors={errors} />}
      <button className='delete-button' onClick={handleClick}>Delete Account</button>
    </div>
  )
}
