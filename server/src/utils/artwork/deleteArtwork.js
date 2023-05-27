import httpStatusCodes from '#Enums/httpStatusCodes.js'
import findArtworkById from './findArtworkById.js'

const deleteArtwork = async ({ artworkId }) => {
  try {
    const artwork = await findArtworkById(artworkId)

    if (!artwork) {
      const error = new Error('No se encontró la obra de arte')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    await artwork.destroy()

    return artwork
  } catch (error) {
    const err = new Error(error.message)
    err.statusCode = error.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw err
  }
}

export default deleteArtwork
