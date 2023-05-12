import generateDTOSchema from '#Utils/generateDTOSchema.js'

const UserUpdateIsArtistDTOSchema = await generateDTOSchema([
  { property: 'isArtist', required: true }
])

export default UserUpdateIsArtistDTOSchema
