import { jwtVerify } from 'jose'

const verifyJWTDTO = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      error: 'No se ha enviado el token'
    })
  }

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    return res.status(401).json({
      error: 'No autorizado'
    })
  }

  try {
    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(token, encoder.encode(process.env.JWT_SECRET))

    req.user = {
      id: payload.id,
      role: payload.role
    }

    next()
  } catch (err) {
    return res.status(401).json({
      error: err.message
    })
  }
}

export default verifyJWTDTO
