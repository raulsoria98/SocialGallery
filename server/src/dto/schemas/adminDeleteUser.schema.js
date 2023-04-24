import generateDTOSchema from '#Utils/generateDTOSchema.js'

const AdminDeleteUserDTOSchema = await generateDTOSchema([
  { property: 'id', required: true }
])

export default AdminDeleteUserDTOSchema
