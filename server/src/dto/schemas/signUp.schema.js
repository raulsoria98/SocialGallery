import generateDTOSchema from '#Utils/generateDTOSchema.js'

const SignUpDTOSchema = await generateDTOSchema([
  { name: 'email', required: true },
  { name: 'password', required: true },
  { name: 'name', required: true },
  { name: 'isArtist', required: false }
])

export default SignUpDTOSchema
