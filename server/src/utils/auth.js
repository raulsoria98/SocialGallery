import { SignJWT } from 'jose'

import User from '#Models/user.js'

import hashPassword from './hashPassword.js'
import comparePassword from './comparePassword.js'
import findUserByEmail from './findUserByEmail.js'

export const generateAuthToken = async ({ id, role }) => {
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

export const loginUser = async ({ email, password }) => {
  try {
    const user = await findUserByEmail(email)

    if (!user || !user.active) {
      const error = new Error('Email o contraseña incorrectos')
      error.status = 401
      throw error
    }

    const correctPassword = await comparePassword({ password, hashedPassword: user.password })

    if (!correctPassword) {
      const error = new Error('Email o contraseña incorrectos')
      error.status = 401
      throw error
    }

    const { id, role } = user

    const jwt = await generateAuthToken({ id, role })

    return jwt
  } catch (err) {
    const error = new Error(err.message)
    error.status = err.status || 500
    throw error
  }
}

export const signUpUser = async ({ email, password, name }) => {
  try {
    const user = await findUserByEmail(email)

    if (user) {
      const error = new Error('El usuario ya existe')
      error.status = 409
      throw error
    }

    const hashedPassword = await hashPassword(password)

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
    const error = new Error(err.message)
    error.status = err.status || 500
    throw error
  }
}
