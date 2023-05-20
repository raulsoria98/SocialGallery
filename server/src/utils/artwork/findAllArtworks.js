import sequelize from '#Config/db.js'
import httpStatusCodes from '#Enums/httpStatusCodes.js'
import Artwork from '#Models/artwork.js'

const findAllArtworks = async (pagination = {}) => {
  const { page = 1, pageSize = 6 } = pagination

  try {
    const artworks = await Artwork.findAll({
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
      group: ['artwork.id'],
      offset: (page - 1) * pageSize,
      limit: pageSize
    })

    return artworks
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default findAllArtworks
