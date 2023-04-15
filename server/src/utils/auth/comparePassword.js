import { compare } from 'bcrypt'

const comparePassword = async ({ password, hashedPassword }) => {
  try {
    const isValid = await compare(password, hashedPassword)
    return isValid
  } catch (err) {
    throw new Error(err.message)
  }
}

export default comparePassword
