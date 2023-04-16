import updateRole from '#Utils/user/updateRole.js'

const postUpdateUserRole = async (req, res) => {
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

export default postUpdateUserRole
