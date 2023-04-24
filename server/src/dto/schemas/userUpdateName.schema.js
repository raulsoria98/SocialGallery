import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserUpdateNameDTOSchema = await generateDTOSchema([
  { property: 'name', required: true }
])

export default UserUpdateNameDTOSchema
