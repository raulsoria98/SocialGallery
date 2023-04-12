import User from '#Models/user.js'
import { SignJWT, jwtVerify } from 'jose'

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

export const generateAuthToken = ({ id, role }) => {
  const jwtConstructor = new SignJWT({ id, role })

  // Encode JSW_SECRET to Uint8Array
  const encodedJwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)

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
  const encodedJwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)

  return jwtVerify(token, encodedJwtSecret).then(({ payload }) => {
    const { id } = payload
    return id
  }).catch(err => {
    throw new Error(err.message)
  })
}
