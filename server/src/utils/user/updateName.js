import findUserById from './findUserById.js'

const updateName = async ({ id, name }) => {
  try {
    const user = await findUserById(id)

    if (!user) {
      const error = new Error('El usuario no existe')
      error.statusCode = 404
      throw error
    }

    if (user.name === name) {
      const error = new Error('El nombre es igual al actual')
      error.statusCode = 400
      throw error
    }

    user.name = name

    await user.save()

    return user
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || 500
    throw error
  }
}

export default updateName
