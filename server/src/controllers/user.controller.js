import httpStatusCodes from '#Enums/httpStatusCodes.js'
import deleteUser from '#Utils/user/deleteUser.js'
import findUserById from '#Utils/user/findUserById.js'
import updateEmail from '#Utils/user/updateEmail.js'
import updateName from '#Utils/user/updateName.js'
import updatePassword from '#Utils/user/updatePassword.js'

export const getProfile = async (err, req, res, next) => {
  console.log('PROFILE')
  console.log(err)
  const { id } = req.user

  try {
    const user = await findUserById(id)

    if (!user) {
      const error = new Error('Usuario no encontrado')
      error.statusCode = httpStatusCodes.NOT_FOUND
      return next(error)
    }

    return res.json({
      user
    })
  } catch (err) {
    return next(err)
  }
}

export const putUpdateName = async (req, res, next) => {
  const { id } = req.user
  const { name } = req.body

  try {
    const user = await updateName({ id, name })

    return res.json({
      user
    })
  } catch (err) {
    return next(err)
  }
}

export const putUpdateEmail = async (req, res, next) => {
  const { id } = req.user
  const { email } = req.body

  try {
    const user = await updateEmail({ id, email })

    return res.json({
      user
    })
  } catch (err) {
    return next(err)
  }
}

export const putUpdatePassword = async (req, res, next) => {
  const { id } = req.user
  const { password } = req.body

  try {
    const user = await updatePassword({ id, password })

    return res.json({
      user
    })
  } catch (err) {
    return next(err)
  }
}

export const deleteDeleteUser = async (req, res, next) => {
  const { id } = req.user

  try {
    const user = await deleteUser(id)

    return res.json({
      user
    })
  } catch (err) {
    return next(err)
  }
}
