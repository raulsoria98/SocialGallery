import httpStatusCodes from '#Enums/httpStatusCodes.js'
import validateSchema from '#Utils/validateSchema.js'
import SignUpDTOSchema from './schemas/signUp.schema.js'

const validateSignUpDTO = (req, res, next) => {
  const errors = validateSchema(req.body, SignUpDTOSchema)

  if (errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      errors
    })
  }

  next()
}

export default validateSignUpDTO
