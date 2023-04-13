import findUserByEmail from './findUserByEmail.js'
import findUserById from './findUserById.js'

const updateEmail = async ({ id, email }) => {
  try {
    const user = await findUserById(id)

    if (!user) {
      const error = new Error('El usuario no existe')
      error.status = 404
      throw error
    }

    if (user.email === email) {
      const error = new Error('El email es igual al actual')
      error.status = 400
      throw error
    }

    if (await findUserByEmail(email)) {
      const error = new Error('El email ya está en uso')
      error.status = 409
      throw error
    }

    user.email = email

    await user.save()

    return user
  } catch (err) {
    const error = new Error(err.message)
    error.status = err.status || 500
    throw error
  }
}

export default updateEmail
