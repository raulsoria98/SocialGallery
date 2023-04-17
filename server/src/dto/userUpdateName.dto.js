import validateSchema from '#Utils/validateSchema.js'
import UserUpdateNameDTOSchema from './schemas/userUpdateName.schema.js'

const validateUserUpdateNameDTO = (req, res, next) => {
  const errors = validateSchema(req.body, UserUpdateNameDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateUserUpdateNameDTO
