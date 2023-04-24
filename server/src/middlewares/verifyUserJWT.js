import httpStatusCodes from '#Enums/httpStatusCodes.js'
import { jwtVerify } from 'jose'

const verifyUserJWT = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    const err = new Error('No se ha enviado el token')
    err.statusCode = httpStatusCodes.UNAUTHORIZED
    return next(err)
  }

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    const err = new Error('No autorizado')
    err.statusCode = httpStatusCodes.UNAUTHORIZED
    return next(err)
  }

  try {
    const encodedJwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, encodedJwtSecret)

    req.user = {
      id: payload.id
    }

    return next()
  } catch (err) {
    err.statusCode = httpStatusCodes.UNAUTHORIZED
    return next(err)
  }
}

export default verifyUserJWT
