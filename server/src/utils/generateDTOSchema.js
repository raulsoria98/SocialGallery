const generateDTOSchema = async (properties) => {
  const schema = {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: false,
    errorMessage: {
      type: 'El tipo de dato no es válido, ha de ser un objeto',
      additionalProperties: `No se permiten campos adicionales, tan solo: ${properties.map(({ name }) => `'${name}'`).join(', ')}`,
      required: {}
    }
  }

  for (const { name, required } of properties) {
    // Utiliza la sintaxis dinámica de importación para cargar el módulo
    const { [name]: property } = await import('#DTO/schemas/properties.js')

    schema.properties[name] = property

    if (required) {
      schema.required.push(name)
      schema.errorMessage.required[name] = `El campo '${name}' es requerido`
    }
  }

  return schema
}

export default generateDTOSchema
