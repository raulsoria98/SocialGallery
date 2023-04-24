import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserUpdatePasswordDTOSchema = await generateDTOSchema([
  { property: 'password', required: true }
])

export default UserUpdatePasswordDTOSchema
