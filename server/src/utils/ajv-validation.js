import Ajv from 'ajv'
import addFormat from 'ajv-formats'
import addErrors from 'ajv-errors'

export const validateSchema = (body, schema) => {
  const ajv = new Ajv({ allErrors: true })
  addFormat(ajv)
  addErrors(ajv)
  const validate = ajv.compile(schema)

  const valid = validate(body)

  if (!valid) {
    const errors = []
    validate.errors.forEach(error => {
      errors.push(error.message)
    })

    return errors
  }

  return []
}
