import User from '#Models/user.js'
import findUserByEmail from '#Utils/user/findUserByEmail.js'
import generateAuthToken from './generateAuthToken.js'
import hashPassword from './hashPassword.js'

const signUpUser = async ({ email, password, name }) => {
  try {
    const user = await findUserByEmail(email)

    if (user) {
      const error = new Error('El usuario ya existe')
      error.statusCode = 409
      throw error
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      role: 'user',
      active: true
    })

    const { id, role } = newUser

    const jwt = await generateAuthToken({ id, role })

    return jwt
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || 500
    throw error
  }
}

export default signUpUser
