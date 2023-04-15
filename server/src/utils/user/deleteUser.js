import findUserById from './findUserById.js'

const deleteUser = async (id) => {
  try {
    const user = await findUserById(id)

    if (!user) {
      const err = new Error('Usuario no encontrado')
      err.statusCode = 404
      throw err
    }

    await user.destroy()

    return user
  } catch (error) {
    const err = new Error(error.message)
    err.statusCode = error.statusCode || 500
    throw err
  }
}

export default deleteUser
