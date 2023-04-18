import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserUpdateEmailDTOSchema = await generateDTOSchema([
  { name: 'email', required: true }
])

export default UserUpdateEmailDTOSchema
