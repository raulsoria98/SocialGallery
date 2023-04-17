import generateDTOSchema from '#Utils/generateDTOSchema.js'

const AdminDeleteUserDTOSchema = generateDTOSchema([
  { name: 'id', required: true }
])

export default AdminDeleteUserDTOSchema
