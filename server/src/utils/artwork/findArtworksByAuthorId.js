import httpStatusCodes from '#Enums/httpStatusCodes.js'
import userRoles from '#Enums/userRoles.js'
import findUserById from '#Utils/user/findUserById.js'

const findArtworksByAuthorId = async (authorId) => {
  try {
    const author = await findUserById(authorId)

    if (!author) {
      const error = new Error('No se encontró el autor')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    if (author.role !== userRoles.ARTIST) {
      const error = new Error('El usuario no es un artista')
      error.statusCode = httpStatusCodes.FORBIDDEN
      throw error
    }

    const artworks = author.getArtworks()

    if (!artworks) {
      const error = new Error('No se encontraron obras del autor')
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

export default findArtworksByAuthorId
