import findUserByEmail from './findUserByEmail.js'

const updateRole = async ({ email, role }) => {
  try {
    const user = await findUserByEmail(email)

    if (!user) {
      const error = new Error('No se encontró el usuario')
      error.statusCode = 404
      throw error
    }

    if (user.role === role) {
      const error = new Error('El rol es igual al actual')
      error.statusCode = 400
      throw error
    }

    user.role = role

    await user.save()

    return user
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || 500
    throw error
  }
}

export default updateRole
