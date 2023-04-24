import generateDTOSchema from '#Utils/generateDTOSchema.js'

const AdminUpdateRoleDTOSchema = await generateDTOSchema([
  { property: 'id', required: true },
  { property: 'role', required: true }
])

export default AdminUpdateRoleDTOSchema
