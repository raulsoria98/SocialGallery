import Artwork from '#Models/artwork.js'
import User from '#Models/user.js'

export const getTest = async (req, res) => {
  const artwork = await Artwork.findByPk(1, {
    include: 'author'
  })
  const user = await User.findByPk(2, {
    include: 'artworks'
  })

  res.json({
    artwork,
    author: artwork.author,
    userArtworks: user.artworks
  })
}
