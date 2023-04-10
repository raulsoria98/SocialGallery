import Ajv from 'ajv'
import addFormat from 'ajv-formats'
import addErrors from 'ajv-errors'

const LoginDTOSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      errorMessage: {
        type: 'El email debe ser un string',
        format: 'El email debe tener un formato válido'
      }
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 50,
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])',
      errorMessage: {
        type: 'La contraseña debe ser un string',
        minLength: 'La contraseña debe tener al menos 6 caracteres',
        maxLength: 'La contraseña debe tener como máximo 50 caracteres',
        pattern: 'La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número'
      }
    }
  },
  required: ['email', 'password'],
  errorMessage: {
    required: {
      email: 'El email es requerido',
      password: 'La contraseña es requerida'
    }
  },
  additionalProperties: false
}

export const validateLoginDTO = (req, res, next) => {
  const ajv = new Ajv({ allErrors: true })
  addFormat(ajv)
  addErrors(ajv)
  const validate = ajv.compile(LoginDTOSchema)

  const valid = validate(req.body)

  if (!valid) {
    const errors = []
    validate.errors.forEach(error => {
      errors.push(error.message)
    })

    return res.status(400).json({
      errors
    })
  }

  next()
}
