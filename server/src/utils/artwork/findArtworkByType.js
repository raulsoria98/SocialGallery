import httpStatusCodes from '#Enums/httpStatusCodes.js'
import Artwork from '#Models/artwork.js'

const findArtworksByType = async (type) => {
  try {
    const artworks = await Artwork.findAll({
      where: {
        type
      }
    })

    if (!artworks.length) {
      const error = new Error(`No se encontraron obras del tipo ${type}`)
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

export default findArtworksByType
