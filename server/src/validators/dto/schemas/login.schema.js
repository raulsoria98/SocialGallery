// To read JSON files in ES Modules, we need to use the createRequire function
import generateDTOSchema from '#Utils/generateDTOSchema.js'

const LoginDTOSchema = generateDTOSchema([
  { name: 'email', required: true },
  { name: 'password', required: true }
])

export default LoginDTOSchema
