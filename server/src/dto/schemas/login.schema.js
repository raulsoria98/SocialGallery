import generateDTOSchema from '#Utils/generateDTOSchema.js'

const LoginDTOSchema = await generateDTOSchema([
  { name: 'email', required: true },
  { name: 'password', required: true }
])

export default LoginDTOSchema
