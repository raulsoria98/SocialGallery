import httpStatusCodes from '#Enums/httpStatusCodes.js'
import validateSchema from '#Utils/validateSchema.js'
import LoginDTOSchema from './schemas/login.schema.js'

const validateLoginDTO = (req, res, next) => {
  const errors = validateSchema(req.body, LoginDTOSchema)

  if (errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      errors
    })
  }

  next()
}

export default validateLoginDTO
