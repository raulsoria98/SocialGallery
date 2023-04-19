import findUserById from './findUserById.js'
import comparePassword from '#Utils/auth/comparePassword.js'
import hashPassword from '#Utils/auth/hashPassword.js'
import httpStatusCodes from '#Enums/httpStatusCodes.js'

const updatePassword = async ({ id, password }) => {
  try {
    const user = await findUserById(id)

    if (!user) {
      const error = new Error('El usuario no existe')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    const samePassword = await comparePassword({ password, hashedPassword: user.password })
    if (samePassword) {
      const error = new Error('La contraseña es igual a la actual')
      error.statusCode = httpStatusCodes.BAD_REQUEST
      throw error
    }

    user.password = await hashPassword(password)

    await user.save()

    return user
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default updatePassword
