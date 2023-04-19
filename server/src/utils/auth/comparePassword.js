import httpStatusCodes from '#Enums/httpStatusCodes.js'
import { compare } from 'bcrypt'

const comparePassword = async ({ password, hashedPassword }) => {
  try {
    const isValid = await compare(password, hashedPassword)
    return isValid
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default comparePassword
