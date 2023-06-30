const generateDTOSchema = async (properties) => {
  const schema = {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: false,
    errorMessage: {
      type: 'El tipo de dato no es válido, ha de ser un objeto',
      additionalProperties: `No se permiten campos adicionales, tan solo: ${properties.map(({ property }) => `'${property}'`).join(', ')}`,
      required: {}
    }
  }

  for (const { property, required, name } of properties) {
    // Si se ha pasado un nombre, se utiliza, si no, se utiliza el nombre de la propiedad
    let propertyToImport = property
    if (name) propertyToImport = name

    // Utiliza la sintaxis dinámica de importación para cargar el módulo
    const { [propertyToImport]: propertyObject } = await import('#DTO/schemas/properties.js')

    schema.properties[property] = propertyObject

    if (required) {
      schema.required.push(property)
      schema.errorMessage.required[property] = `El campo '${property}' es requerido`
    }
  }

  return schema
}

export default generateDTOSchema
