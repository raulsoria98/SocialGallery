import httpStatusCodes from '#Enums/httpStatusCodes.js'
import findUserById from './findUserById.js'

const deleteUser = async (id) => {
  try {
    const user = await findUserById(id)

    if (!user) {
      const err = new Error('Usuario no encontrado')
      err.statusCode = httpStatusCodes.NOT_FOUND
      throw err
    }

    await user.destroy()

    return user
  } catch (error) {
    const err = new Error(error.message)
    err.statusCode = error.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw err
  }
}

export default deleteUser
