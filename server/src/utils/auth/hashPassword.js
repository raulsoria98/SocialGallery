import SALT from '#Constants/salt.js'
import httpStatusCodes from '#Enums/httpStatusCodes.js'
import { hash } from 'bcrypt'

const hashPassword = async (password) => {
  try {
    const hashedPassword = await hash(password, SALT)
    return hashedPassword
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default hashPassword
