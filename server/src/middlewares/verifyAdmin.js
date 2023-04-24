import httpStatusCodes from '#Enums/httpStatusCodes.js'
import isAdmin from '#Utils/user/isAdmin.js'

const verifyAdmin = async (req, res, next) => {
  try {
    const admin = await isAdmin(req.user.id)

    if (!admin) {
      const error = new Error('No autorizado')
      error.statusCode = httpStatusCodes.FORBIDDEN
      throw error
    }

    return next()
  } catch (err) {
    return next(err)
  }
}

export default verifyAdmin
