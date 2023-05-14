import httpStatusCodes from '#Enums/httpStatusCodes.js'
import userRoles from '#Enums/userRoles.js'
import deleteUser from '#Utils/user/deleteUser.js'
import findUserById from '#Utils/user/findUserById.js'
import updateEmail from '#Utils/user/updateEmail.js'
import updateName from '#Utils/user/updateName.js'
import updatePassword from '#Utils/user/updatePassword.js'
import updateRole from '#Utils/user/updateRole.js'

export const getProfile = async (req, res, next) => {
  const { id } = req.user

  try {
    const user = await findUserById(id)

    if (!user) {
      const error = new Error('Usuario no encontrado')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
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

export const putUpdateIsArtist = async (req, res, next) => {
  const { id } = req.user
  const { isArtist } = req.body

  try {
    const role = isArtist ? userRoles.ARTIST : userRoles.USER
    const user = await updateRole({ id, role })

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

export const getUserData = async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await findUserById(id)

    if (!user) {
      const error = new Error('Usuario no encontrado')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    return res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    return next(err)
  }
}
