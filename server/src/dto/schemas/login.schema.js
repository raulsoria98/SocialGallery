import generateDTOSchema from '#Utils/generateDTOSchema.js'

const LoginDTOSchema = generateDTOSchema([
  { name: 'email', required: true },
  { name: 'password', required: true }
])

export default LoginDTOSchema
