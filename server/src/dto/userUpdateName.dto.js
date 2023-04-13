import validateSchema from '#Utils/validateSchema.js'
import UpdateNameDTOSchema from './schemas/updateName.schema.js'

const validateUpdateNameDTO = (req, res, next) => {
  const errors = validateSchema(req.body, UpdateNameDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateUpdateNameDTO
