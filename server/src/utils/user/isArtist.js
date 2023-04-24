import userRoles from '#Enums/userRoles.js'
import findUserById from './findUserById.js'

const isArtist = async (userId) => {
  const user = await findUserById(userId)

  return user.role === userRoles.ARTIST
}

export default isArtist
