import httpStatusCodes from '#Enums/httpStatusCodes.js'
import Rating from '#Models/rating.js'

export default async function findRatingByUserArtwork ({ userId, artworkId }) {
  try {
    const rating = await Rating.findOne({
      where: {
        userId,
        artworkId
      }
    })

    return rating
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}
