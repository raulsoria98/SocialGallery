import User from '../models/user.js'
import { SignJWT, jwtVerify } from 'jose'
import { JWT_SECRET } from '../lib/config.js'

export const authByEmailPassword = (email, password) => {
  return User.findOne({ where: { email } }).then(user => {
    if (!user) {
      throw new Error('Usuario no existe')
    }

    // Validar la contraseña
    if (password !== user.password) {
      throw new Error('Contraseña incorrecta')
    }

    if (!user.active) {
      throw new Error('Usuario inactivo')
    }

    return user
  }).catch(err => {
    throw new Error(err.message)
  })
}

export const generateAuthToken = id => {
  const jwtConstructor = new SignJWT({ id })

  // Encode JSW_SECRET to Uint8Array
  const encodedJwtSecret = new TextEncoder().encode(JWT_SECRET)

  return jwtConstructor
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encodedJwtSecret).then(jwt => {
      return jwt
    }).catch(err => {
      throw new Error(err.message)
    })
}

export const authorizeByToken = token => {
  const encodedJwtSecret = new TextEncoder().encode(JWT_SECRET)

  return jwtVerify(token, encodedJwtSecret).then(({ payload }) => {
    const { id } = payload
    return id
  }).catch(err => {
    throw new Error(err.message)
  })
}
