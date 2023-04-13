import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UpdatePasswordDTOSchema = generateDTOSchema([
  { name: 'password', required: true }
])

export default UpdatePasswordDTOSchema
