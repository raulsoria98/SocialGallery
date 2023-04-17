import validateSchema from '#Utils/validateSchema.js'
import AdminUpdateRoleDTOSchema from './schemas/adminUpdateRole.schema.js'

const validateAdminUpdateRoleDTO = (req, res, next) => {
  const errors = validateSchema(req.body, AdminUpdateRoleDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateAdminUpdateRoleDTO
