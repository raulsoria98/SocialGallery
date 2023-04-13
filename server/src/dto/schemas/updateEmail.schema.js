import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UpdateEmailDTOSchema = generateDTOSchema([
  { name: 'email', required: true }
])

export default UpdateEmailDTOSchema
