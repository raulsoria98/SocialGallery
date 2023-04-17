import validateSchema from '#Utils/validateSchema.js'
import AdminDeleteUserDTOSchema from './schemas/adminDeleteUser.schema.js'

const validateAdminDeleteUserDTO = (req, res, next) => {
  const errors = validateSchema(req.body, AdminDeleteUserDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateAdminDeleteUserDTO
