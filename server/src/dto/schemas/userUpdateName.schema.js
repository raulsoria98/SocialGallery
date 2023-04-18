import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserUpdateNameDTOSchema = await generateDTOSchema([
  { name: 'name', required: true }
])

export default UserUpdateNameDTOSchema
