import findUserById from './findUserById.js'
import comparePassword from './comparePassword.js'
import hashPassword from './hashPassword.js'

const updatePassword = async ({ id, password }) => {
  try {
    const user = await findUserById(id)

    if (!user) {
      const error = new Error('El usuario no existe')
      error.status = 404
      throw error
    }

    const samePassword = await comparePassword({ password, hashedPassword: user.password })
    if (samePassword) {
      const error = new Error('La contraseña es igual a la actual')
      error.status = 400
      throw error
    }

    user.password = await hashPassword(password)

    await user.save()

    return user
  } catch (err) {
    const error = new Error(err.message)
    error.status = err.status || 500
    throw error
  }
}

export default updatePassword
