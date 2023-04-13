import validateSchema from '#Utils/validateSchema.js'
import UpdateEmailDTOSchema from './schemas/updateEmail.schema.js'

const validateUpdateEmailDTO = (req, res, next) => {
  const errors = validateSchema(req.body, UpdateEmailDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateUpdateEmailDTO
