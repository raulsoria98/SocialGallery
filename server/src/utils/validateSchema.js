import Ajv from 'ajv'
import addFormat from 'ajv-formats'
import addErrors from 'ajv-errors'

const validateSchema = (body, schema) => {
  const ajv = new Ajv({ allErrors: true })
  addFormat(ajv)
  addErrors(ajv)
  const validate = ajv.compile(schema)

  const valid = validate(body)

  if (!valid) {
    return validate.errors.map(error => error.message)
  }

  return []
}

export default validateSchema
