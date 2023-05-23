import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserRateArtworkDTOSchema = await generateDTOSchema([
  { property: 'artworkId', required: true, name: 'id' },
  { property: 'score', required: true },
  { property: 'comment', required: false }
])

export default UserRateArtworkDTOSchema
