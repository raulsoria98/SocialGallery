import User from '#Models/user.js'

export const getProfile = async (req, res) => {
  const { id } = req.user

  try {
    const user = await User.findOne({
      where: {
        id
      }
    })

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
