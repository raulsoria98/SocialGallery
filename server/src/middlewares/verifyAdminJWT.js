import httpStatusCodes from '#Enums/httpStatusCodes.js'
import userRoles from '#Enums/userRoles.js'

const verifyAdminJWT = (req, res, next) => {
  if (req.user.role !== userRoles.ADMIN) {
    const err = new Error('No autorizado')
    err.statusCode = httpStatusCodes.FORBIDDEN
    next(err)
  }

  next()
}

export default verifyAdminJWT
