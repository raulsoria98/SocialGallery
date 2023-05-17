import User from '#Models/user.js'
import Artwork from '#Models/artwork.js'
import Rating from '#Models/rating.js'

const associateModels = () => {
  // User has many artworks
  User.hasMany(Artwork, {
    foreignKey: 'authorId',
    as: 'artworks'
  })
  Artwork.belongsTo(User, {
    foreignKey: 'authorId',
    as: 'author'
  })
  // User has many ratings
  User.hasMany(Rating, {
    foreignKey: 'userId',
    as: 'ratings'
  })
  Rating.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  })
  // Artwork has many ratings
  Artwork.hasMany(Rating, {
    foreignKey: 'artworkId',
    as: 'ratings'
  })
  Rating.belongsTo(Artwork, {
    foreignKey: 'artworkId',
    as: 'artwork'
  })
}

export default associateModels
