import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserUpdateEmailDTOSchema = generateDTOSchema([
  { name: 'email', required: true }
])

export default UserUpdateEmailDTOSchema
