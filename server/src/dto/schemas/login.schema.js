import generateDTOSchema from '#Utils/generateDTOSchema.js'

const LoginDTOSchema = await generateDTOSchema([
  { property: 'email', required: true },
  { property: 'password', required: true }
])

export default LoginDTOSchema
