import validateSchema from '#Utils/validateSchema.js'
import LoginDTOSchema from './schemas/login.schema.js'

const validateLoginDTO = (req, res, next) => {
  const errors = validateSchema(req.body, LoginDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateLoginDTO
