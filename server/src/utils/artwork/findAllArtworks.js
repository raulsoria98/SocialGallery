import sequelize from '#Config/db.js'
import httpStatusCodes from '#Enums/httpStatusCodes.js'
import Artwork from '#Models/artwork.js'

const findAllArtworks = async () => {
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
        [sequelize.cast(sequelize.fn('AVG', sequelize.col('ratings.score')), 'FLOAT'), 'rating']
      ],
      group: ['artwork.id']
    })

    return artworks
  } catch (err) {
    const error = new Error(err.message)
    error.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR
    throw error
  }
}

export default findAllArtworks
