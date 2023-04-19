import httpStatusCodes from '#Enums/httpStatusCodes.js'
import validateSchema from '#Utils/validateSchema.js'
import UserUpdateEmailDTOSchema from './schemas/userUpdateEmail.schema.js'

const validateUserUpdateEmailDTO = (req, res, next) => {
  const errors = validateSchema(req.body, UserUpdateEmailDTOSchema)

  if (errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      errors
    })
  }

  next()
}

export default validateUserUpdateEmailDTO
