import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserUpdateEmailDTOSchema = await generateDTOSchema([
  { property: 'email', required: true }
])

export default UserUpdateEmailDTOSchema
