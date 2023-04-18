import generateDTOSchema from '#Utils/generateDTOSchema.js'

const AdminDeleteUserDTOSchema = await generateDTOSchema([
  { name: 'id', required: true }
])

export default AdminDeleteUserDTOSchema
