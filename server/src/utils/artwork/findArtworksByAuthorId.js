import sequelize from '#Config/db.js'
import httpStatusCodes from '#Enums/httpStatusCodes.js'
import userRoles from '#Enums/userRoles.js'
import Artwork from '#Models/artwork.js'
import User from '#Models/user.js'

const findArtworksByAuthorId = async (authorId, pagination = {}, sort = false) => {
  const { page = 1, pageSize = 6 } = pagination

  try {
    const author = await User.findByPk(authorId)

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

    const query = {
      include: [
        {
          association: 'author',
          attributes: ['name', 'email', 'role']
        },
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
        [sequelize.cast(sequelize.literal('(SELECT AVG(`ratings`.`score`) FROM `ratings` WHERE `ratings`.`artworkId` = `artwork`.`id`)'), 'FLOAT'), 'rating']
      ],
      where: {
        authorId
      },
      group: ['artwork.id'],
      offset: (page - 1) * pageSize,
      limit: pageSize
    }

    if (sort) {
      query.order = [[sequelize.literal('rating'), 'DESC']]
    }

    const artworks = await Artwork.findAll(query)

    const totalArtworks = await Artwork.count({
      where: {
        authorId
      }
    })

    return {
      artworks,
      totalArtworks
    }
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default findArtworksByAuthorId
