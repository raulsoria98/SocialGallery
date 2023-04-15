import validateSchema from '#Utils/validateSchema.js'
import UpdateRoleDTOSchema from './schemas/updateRole.schema.js'

const validateUpdateRoleDTO = (req, res, next) => {
  const errors = validateSchema(req.body, UpdateRoleDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export default validateUpdateRoleDTO
