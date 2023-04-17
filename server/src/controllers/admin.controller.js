import deleteUser from '#Utils/user/deleteUser.js'
import updateRole from '#Utils/user/updateRole.js'

export const postAdminUpdateUserRole = async (req, res) => {
  const { id, role } = req.body

  try {
    const user = await updateRole({ id, role })

    return res.json({
      user
    })
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      error: err.message
    })
  }
}

export const deleteAdminDeleteUser = async (req, res) => {
  const { id } = req.body

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
