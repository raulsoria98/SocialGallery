import deleteUser from '#Utils/deleteUser.js'
import findUserById from '#Utils/findUserById.js'
import updateEmail from '#Utils/updateEmail.js'
import updateName from '#Utils/updateName.js'
import updatePassword from '#Utils/updatePassword.js'

export const getProfile = async (req, res) => {
  const { id } = req.user

  try {
    const user = await findUserById(id)

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      })
    }

    return res.json({
      user
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
}

export const postUpdateName = async (req, res) => {
  const { id } = req.user
  const { name } = req.body

  try {
    const user = await updateName({ id, name })

    return res.json({
      user
    })
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      error: err.message
    })
  }
}

export const postUpdateEmail = async (req, res) => {
  const { id } = req.user
  const { email } = req.body

  try {
    const user = await updateEmail({ id, email })

    return res.json({
      user
    })
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      error: err.message
    })
  }
}

export const postUpdatePassword = async (req, res) => {
  const { id } = req.user
  const { password } = req.body

  try {
    const user = await updatePassword({ id, password })

    return res.json({
      user
    })
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      error: err.message
    })
  }
}

export const deleteDeleteUser = async (req, res) => {
  const { id } = req.user

  try {
    const user = await deleteUser(id)

    return res.json({
      user
    })
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      error: err.message
    })
  }
}
