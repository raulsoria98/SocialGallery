import httpStatusCodes from '#Enums/httpStatusCodes.js'
import { SignJWT } from 'jose'

const generateAuthToken = async ({ id, role }) => {
  try {
    const jwtConstructor = new SignJWT({ id, role })

    // Encode JSW_SECRET to Uint8Array
    const encodedJwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)

    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(encodedJwtSecret)
    return jwt
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default generateAuthToken
