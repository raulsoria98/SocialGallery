import httpStatusCodes from '#Enums/httpStatusCodes.js'
import Rating from '#Models/rating.js'

const findRatingsByArtworkId = async ({ artworkId }) => {
  try {
    const ratings = await Rating.findAll({
      where: {
        artworkId
      }
    })

    return ratings
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default findRatingsByArtworkId
