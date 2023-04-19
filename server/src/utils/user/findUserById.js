import httpStatusCodes from '#Enums/httpStatusCodes.js'
import User from '#Models/user.js'

const findUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id
      }
    })

    if (!user) {
      return null
    }

    return user
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default findUserById
