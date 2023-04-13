import validateSchema from '#Utils/validateSchema.js'
import UpdatePasswordDTOSchema from './schemas/updatePassword.schema.js'

const validateUpdatePasswordDTO = (req, res, next) => {
  const errors = validateSchema(req.body, UpdatePasswordDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateUpdatePasswordDTO
