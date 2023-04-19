import httpStatusCodes from '#Enums/httpStatusCodes.js'
import findUserById from './findUserById.js'

const updateName = async ({ id, name }) => {
  try {
    const user = await findUserById(id)

    if (!user) {
      const error = new Error('El usuario no existe')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    if (user.name === name) {
      const error = new Error('El nombre es igual al actual')
      error.statusCode = httpStatusCodes.BAD_REQUEST
      throw error
    }

    user.name = name

    await user.save()

    return user
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default updateName
