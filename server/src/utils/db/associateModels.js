import User from '#Models/user.js'
import Artwork from '#Models/artwork.js'

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
}

export default associateModels
