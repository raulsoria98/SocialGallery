import { hash } from 'bcrypt'

const hashPassword = async (password) => {
  try {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
  } catch (err) {
    throw new Error(err.message)
  }
}

export default hashPassword
