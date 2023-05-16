import httpStatusCodes from '#Enums/httpStatusCodes.js'
import Artwork from '#Models/artwork.js'

const findArworkByAuthorTitle = async ({ authorId, title }) => {
  try {
    const artwork = await Artwork.findOne({
      where: {
        title,
        authorId
      },
      include: 'author'
    })

    if (!artwork) {
      return null
    }

    const mappedAuthor = {
      name: artwork.author.name,
      email: artwork.author.email,
      role: artwork.author.role
    }

    artwork.setDataValue('author', mappedAuthor)

    return artwork
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default findArworkByAuthorTitle
