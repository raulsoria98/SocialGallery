import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserUpdateNameDTOSchema = generateDTOSchema([
  { name: 'name', required: true }
])

export default UserUpdateNameDTOSchema
