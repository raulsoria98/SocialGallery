import httpStatusCodes from '#Enums/httpStatusCodes.js'
import isAdmin from '#Utils/user/isAdmin.js'

const verifyAdmin = async (req, res, next) => {
  if (!await isAdmin(req.user.id)) {
    const err = new Error('No autorizado')
    err.statusCode = httpStatusCodes.FORBIDDEN
    return next(err)
  }

  return next()
}

export default verifyAdmin
