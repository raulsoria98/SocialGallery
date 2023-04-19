import SALT from '#Constants/salt.js'
import { hash } from 'bcrypt'

const hashPassword = async (password) => {
  try {
    const hashedPassword = await hash(password, SALT)
    return hashedPassword
  } catch (err) {
    throw new Error(err.message)
  }
}

export default hashPassword
