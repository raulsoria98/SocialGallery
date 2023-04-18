import USER_ROLES from '#Enums/USER_ROLES.js'

const verifyAdminJWT = (req, res, next) => {
  if (req.user.role !== USER_ROLES.ADMIN) {
    return res.status(403).json({
      error: 'No autorizado'
    })
  }

  next()
}

export default verifyAdminJWT
