import httpStatusCodes from '#Enums/httpStatusCodes.js'
import Artwork from '#Models/artwork.js'
import isArtist from '#Utils/user/isArtist.js'
import findArworkByAuthorTitle from './findArtworkByAuthorTitle.js'

export const createArtwork = async ({ authorId, title, description, type }) => {
  try {
    if (!await isArtist(authorId)) {
      const error = new Error('El usuario no es un artista')
      error.statusCode = httpStatusCodes.FORBIDDEN
      throw error
    }

    if (await findArworkByAuthorTitle({ authorId, title })) {
      const error = new Error('El usuario ya tiene una obra con ese título')
      error.statusCode = httpStatusCodes.CONFLICT
      throw error
    }

    const newArtwork = await Artwork.create({
      title,
      description,
      type,
      authorId
    })

    return newArtwork
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}
