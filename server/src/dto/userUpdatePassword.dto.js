import validateSchema from '#Utils/validateSchema.js'
import UserUpdatePasswordDTOSchema from './schemas/userUpdatePassword.schema.js'

const validateUserUpdatePasswordDTO = (req, res, next) => {
  const errors = validateSchema(req.body, UserUpdatePasswordDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateUserUpdatePasswordDTO
