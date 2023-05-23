import httpStatusCodes from '#Enums/httpStatusCodes.js'
import Rating from '#Models/rating.js'
import findRatingByUserArtwork from './findRatingByUserArtwork.js'

const rateArtwork = async ({ userId, artworkId, score, comment }) => {
  try {
    const rating = await findRatingByUserArtwork({ userId, artworkId })

    if (rating) {
      const error = new Error('El usuario ya ha valorado esta obra')
      error.statusCode = httpStatusCodes.CONFLICT
      throw error
    }

    const newRating = await Rating.create({
      userId,
      artworkId,
      score,
      comment
    })

    return newRating
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default rateArtwork
