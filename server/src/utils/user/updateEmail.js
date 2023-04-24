import httpStatusCodes from '#Enums/httpStatusCodes.js'
import findUserByEmail from './findUserByEmail.js'
import findUserById from './findUserById.js'

const updateEmail = async ({ id, email }) => {
  try {
    const user = await findUserById(id)

    if (!user) {
      const error = new Error('Usuario no encontrado')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    if (user.email === email) {
      const error = new Error('El email es igual al actual')
      error.statusCode = httpStatusCodes.BAD_REQUEST
      throw error
    }

    if (await findUserByEmail(email)) {
      const error = new Error('El email ya está en uso')
      error.statusCode = httpStatusCodes.CONFLICT
      throw error
    }

    user.email = email

    await user.save()

    return user
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default updateEmail
