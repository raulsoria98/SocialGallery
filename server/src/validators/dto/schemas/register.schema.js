// To read JSON files in ES Modules, we need to use the createRequire function
import generateDTOSchema from '#Utils/generateDTOSchema.js'

const RegisterDTOSchema = generateDTOSchema([
  { name: 'email', required: true },
  { name: 'password', required: true },
  { name: 'name', required: true },
  { name: 'role', required: true }
])

export default RegisterDTOSchema
