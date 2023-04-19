import httpStatusCodes from '#Enums/httpStatusCodes.js'
import validateSchema from '#Utils/validateSchema.js'
import AdminUpdateRoleDTOSchema from './schemas/adminUpdateRole.schema.js'

const validateAdminUpdateRoleDTO = (req, res, next) => {
  const errors = validateSchema(req.body, AdminUpdateRoleDTOSchema)

  if (errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      errors
    })
  }

  next()
}

export default validateAdminUpdateRoleDTO
