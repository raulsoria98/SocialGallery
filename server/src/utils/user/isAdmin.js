import httpStatusCodes from '#Enums/httpStatusCodes.js'
import userRoles from '#Enums/userRoles.js'
import findUserById from './findUserById.js'

const isAdmin = async (userId) => {
  try {
    const user = await findUserById(userId)

    if (!user) {
      const error = new Error('Usuario no encontrado')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    return user.role === userRoles.ADMIN
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default isAdmin
