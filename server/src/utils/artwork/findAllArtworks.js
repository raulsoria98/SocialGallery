import httpStatusCodes from '#Enums/httpStatusCodes.js'
import Artwork from '#Models/artwork.js'

const findAllArtworks = async () => {
  try {
    const artworks = await Artwork.findAll({
      include: 'author'
    })

    artworks.forEach(artwork => {
      const mappedAuthor = {
        name: artwork.author.name,
        email: artwork.author.email,
        role: artwork.author.role
      }

      artwork.setDataValue('author', mappedAuthor)
    })

    return artworks
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default findAllArtworks
