import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UpdateNameDTOSchema = generateDTOSchema([
  { name: 'name', required: true }
])

export default UpdateNameDTOSchema
