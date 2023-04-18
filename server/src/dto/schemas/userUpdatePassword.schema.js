import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserUpdatePasswordDTOSchema = await generateDTOSchema([
  { name: 'password', required: true }
])

export default UserUpdatePasswordDTOSchema
