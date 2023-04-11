import { validateSchema } from '#Utils/ajv-validation.js'

// To read JSON files in ES Modules, we need to use the createRequire function
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const LoginDTOSchema = require('./schemas/login.dto.json')
const RegisterDTOSchema = require('./schemas/register.dto.json')

export const validateLoginDTO = (req, res, next) => {
  const errors = validateSchema(req.body, LoginDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}

export const validateRegisterDTO = (req, res, next) => {
  const errors = validateSchema(req.body, RegisterDTOSchema)

  if (errors.length > 0) {
    return res.status(400).json({
      errors
    })
  }

  next()
}
