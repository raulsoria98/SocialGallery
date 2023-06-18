import sequelize from '#Config/db.js'
import httpStatusCodes from '#Enums/httpStatusCodes.js'
import userRoles from '#Enums/userRoles.js'
import Artwork from '#Models/artwork.js'

const findArtworksByType = async (type, pagination = {}, sort = false) => {
  const { page = 1, pageSize = 6 } = pagination

  try {
    const query = {
      include: [
        {
          association: 'author',
          attributes: ['name', 'email', 'role'],
          where: {
            role: userRoles.ARTIST
          }
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
        'createdAt',
        [sequelize.cast(sequelize.literal('(SELECT AVG(`ratings`.`score`) FROM `ratings` WHERE `ratings`.`artworkId` = `artwork`.`id`)'), 'FLOAT'), 'rating']
      ],
      order: [['createdAt', 'DESC']],
      group: ['artwork.id'],
      offset: (page - 1) * pageSize,
      limit: pageSize,
      where: {
        type
      }
    }

    if (sort) {
      query.order = [[sequelize.literal('rating'), 'DESC'], ['createdAt', 'DESC']]
    }

    const artworks = await Artwork.findAll(query)

    const totalArtworks = await Artwork.count({
      include: [
        {
          association: 'author',
          where: {
            role: userRoles.ARTIST
          }
        }
      ],
      where: {
        type
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

export default findArtworksByType
