import sequelize from '#Config/db.js'
import httpStatusCodes from '#Enums/httpStatusCodes.js'
import userRoles from '#Enums/userRoles.js'
import User from '#Models/user.js'

const findArtworksByAuthorId = async (authorId) => {
  try {
    const author = await User.findByPk(authorId, {
      include: [
        {
          association: 'artworks',
          include: [
            {
              association: 'ratings',
              attributes: []
            }
          ],
          attributes: [
            'id',
            'title',
            'description',
            'type',
            'file',
            'authorId',
            [sequelize.literal('(SELECT AVG(`ratings`.`score`) FROM `ratings` WHERE `ratings`.`artworkId` = `artworks`.`id`)'), 'rating']
          ],
          group: ['artwork.id']
        }
      ],
      attributes: ['name', 'email', 'role']
    })

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

    const artworks = author.artworks

    if (!artworks) {
      const error = new Error('No se encontraron obras del autor')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    artworks.forEach(artwork => {
      const mappedAuthor = {
        name: author.name,
        email: author.email,
        role: author.role
      }

      artwork.setDataValue('author', mappedAuthor)
    })

    return artworks
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default findArtworksByAuthorId
