import userRoles from '#Enums/userRoles.js'
import findUserById from './findUserById.js'

const isAdmin = async (userId) => {
  const user = await findUserById(userId)

  return user.role === userRoles.ADMIN
}

export default isAdmin
