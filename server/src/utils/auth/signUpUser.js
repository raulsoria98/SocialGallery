import httpStatusCodes from '#Enums/httpStatusCodes.js'
import userRoles from '#Enums/userRoles.js'
import User from '#Models/user.js'
import findUserByEmail from '#Utils/user/findUserByEmail.js'
import generateAuthToken from './generateAuthToken.js'
import hashPassword from './hashPassword.js'

const signUpUser = async ({ email, password, name }) => {
  try {
    const user = await findUserByEmail(email)

    if (user) {
      const error = new Error('El usuario ya existe')
      error.statusCode = httpStatusCodes.CONFLICT
      throw error
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      role: userRoles.USER,
      active: true
    })

    const { id, role } = newUser

    const jwt = await generateAuthToken({ id, role })

    return jwt
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default signUpUser
