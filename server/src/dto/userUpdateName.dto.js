import httpStatusCodes from '#Enums/httpStatusCodes.js'
import validateSchema from '#Utils/validateSchema.js'
import UserUpdateNameDTOSchema from './schemas/userUpdateName.schema.js'

const validateUserUpdateNameDTO = (req, res, next) => {
  const errors = validateSchema(req.body, UserUpdateNameDTOSchema)

  if (errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      errors
    })
  }

  return next()
}

export default validateUserUpdateNameDTO
