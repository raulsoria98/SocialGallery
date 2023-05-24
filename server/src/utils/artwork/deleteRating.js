import httpStatusCodes from '#Enums/httpStatusCodes.js'
import findRatingByUserArtwork from './findRatingByUserArtwork.js'

const deleteRating = async ({ userId, artworkId }) => {
  try {
    const rating = await findRatingByUserArtwork({ userId, artworkId })

    if (!rating) {
      const error = new Error('No se encontró la calificación')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    await rating.destroy()

    return rating
  } catch (error) {
    const err = new Error(error.message)
    err.statusCode = error.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw err
  }
}

export default deleteRating
