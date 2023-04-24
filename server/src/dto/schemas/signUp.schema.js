import generateDTOSchema from '#Utils/generateDTOSchema.js'

const SignUpDTOSchema = await generateDTOSchema([
  { property: 'email', required: true },
  { property: 'password', required: true },
  { property: 'name', required: true },
  { property: 'isArtist', required: false }
])

export default SignUpDTOSchema
