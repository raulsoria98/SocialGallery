import findUserByEmail from '#Utils/user/findUserByEmail.js'
import comparePassword from './comparePassword.js'
import generateAuthToken from './generateAuthToken.js'

const loginUser = async ({ email, password }) => {
  try {
    const user = await findUserByEmail(email)

    if (!user || !user.active) {
      const error = new Error('Email o contraseña incorrectos')
      error.statusCode = 401
      throw error
    }

    const correctPassword = await comparePassword({ password, hashedPassword: user.password })

    if (!correctPassword) {
      const error = new Error('Email o contraseña incorrectos')
      error.statusCode = 401
      throw error
    }

    const { id, role } = user

    const jwt = await generateAuthToken({ id, role })

    return jwt
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || 500
    throw error
  }
}

export default loginUser
