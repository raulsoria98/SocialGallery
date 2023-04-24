import generateDTOSchema from '#Utils/generateDTOSchema.js'

const ArtistCreateArtworkDTOSchema = await generateDTOSchema([
  { property: 'title', required: true },
  { property: 'description', required: true },
  { property: 'type', required: true, name: 'artworkType' }
])

export default ArtistCreateArtworkDTOSchema
