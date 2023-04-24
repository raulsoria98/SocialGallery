import httpStatusCodes from '#Enums/httpStatusCodes.js'
import Artwork from '#Models/artwork.js'

const findAllArtworks = async () => {
  try {
    const artworks = await Artwork.findAll()

    if (!artworks.length) {
      const error = new Error('No se encontraron obras de arte')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    return artworks
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default findAllArtworks
