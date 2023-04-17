import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserUpdatePasswordDTOSchema = generateDTOSchema([
  { name: 'password', required: true }
])

export default UserUpdatePasswordDTOSchema
