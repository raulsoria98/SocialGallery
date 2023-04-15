import { SignJWT } from 'jose'

const generateAuthToken = async ({ id, role }) => {
  try {
    const jwtConstructor = new SignJWT({ id, role })

    // Encode JSW_SECRET to Uint8Array
    const encodedJwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)

    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(encodedJwtSecret)
    return jwt
  } catch (err) {
    throw new Error(err.message)
  }
}

export default generateAuthToken
