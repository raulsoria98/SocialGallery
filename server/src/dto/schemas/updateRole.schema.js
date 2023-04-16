import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UpdateRoleDTOSchema = generateDTOSchema([
  { name: 'id', required: true },
  { name: 'role', required: true }
])

export default UpdateRoleDTOSchema
