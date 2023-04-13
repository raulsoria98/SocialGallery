import findUserById from '#Utils/findUserById.js'

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
    const user = await findUserById(id)

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      })
    }

    if (user.name === name) {
      return res.status(400).json({
        error: 'El nombre es igual al actual'
      })
    }

    user.name = name

    await user.save()

    return res.json({
      user
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
}
