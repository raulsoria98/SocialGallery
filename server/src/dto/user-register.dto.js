import { validateSchema } from '#Utils/ajv-validation.js'
import RegisterDTOSchema from './schemas/register.schema.js'

const validateRegisterDTO = (req, res, next) => {
  const errors = validateSchema(req.body, RegisterDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateRegisterDTO
