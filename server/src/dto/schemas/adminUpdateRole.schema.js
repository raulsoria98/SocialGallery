import generateDTOSchema from '#Utils/generateDTOSchema.js'

const AdminUpdateRoleDTOSchema = generateDTOSchema([
  { name: 'id', required: true },
  { name: 'role', required: true }
])

export default AdminUpdateRoleDTOSchema
