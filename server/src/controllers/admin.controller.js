import deleteUser from '#Utils/user/deleteUser.js'
import updateRole from '#Utils/user/updateRole.js'

export const postAdminUpdateUserRole = async (req, res, next) => {
  const { id, role } = req.body

  try {
    const user = await updateRole({ id, role })

    return res.json({
      user
    })
  } catch (err) {
    return next(err)
  }
}

export const deleteAdminDeleteUser = async (req, res, next) => {
  const { id } = req.body

  try {
    const user = await deleteUser(id)

    return res.json({
      user
    })
  } catch (err) {
    return next(err)
  }
}
