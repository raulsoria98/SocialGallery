import validateSchema from '#Utils/validateSchema.js'
import SignUpDTOSchema from './schemas/signUp.schema.js'

const validateSignUpDTO = (req, res, next) => {
  const errors = validateSchema(req.body, SignUpDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateSignUpDTO
