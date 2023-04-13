import { compare, hash } from 'bcrypt'
import { SignJWT } from 'jose'

import User from '#Models/user.js'

import findUserByEmail from './findUserByEmail.js'

export const generateAuthToken = async ({ id, role }) => {
  const jwtConstructor = new SignJWT({ id, role })

  // Encode JSW_SECRET to Uint8Array
  const encodedJwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)

  try {
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

export const loginUser = async ({ email, password }) => {
  try {
    const user = await findUserByEmail(email)

    if (!user || !user.active) {
      return null
    }

    const correctPassword = await compare(password, user.password)

    if (!correctPassword) {
      return null
    }

    const { id, role } = user

    const jwt = await generateAuthToken({ id, role })

    return jwt
  } catch (err) {
    throw new Error(err.message)
  }
}

export const registerUser = async ({ email, password, name }) => {
  try {
    const user = await findUserByEmail(email)

    if (user) {
      return null
    }

    const hashedPassword = await hash(password, 12)

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      role: 'user',
      active: true
    })

    const { id, role } = newUser

    const jwt = await generateAuthToken({ id, role })

    return jwt
  } catch (err) {
    throw new Error(err.message)
  }
}
