const verifyAdminJWT = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'No autorizado'
    })
  }

  next()
}

export default verifyAdminJWT
