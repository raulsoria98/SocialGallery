// To read JSON files in ES Modules, we need to use the createRequire function
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const generateDTOSchema = (properties) => {
  const propertiesObject = {}
  const requiredProperties = []
  const requiredErrorsMessages = {}

  properties.forEach(property => {
    const { name, required } = property
    propertiesObject[name] = require(`#Validators/dto/schemas/properties/${name}.json`)
    if (required) {
      requiredProperties.push(name)
      requiredErrorsMessages[name] = `El campo ${name} es requerido`
    }
  })

  return {
    type: 'object',
    properties: propertiesObject,
    required: requiredProperties,
    additionalProperties: false,
    errorMessage: {
      type: 'El tipo de dato no es válido, ha de ser un objeto',
      additionalProperties: `No se permiten campos adicionales, tan solo: ${Object.keys(propertiesObject).join(', ')}`,
      required: requiredErrorsMessages
    }
  }
}

export default generateDTOSchema
