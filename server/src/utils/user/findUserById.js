import User from '#Models/user.js'

const findUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id
      }
    })

    if (!user) {
      return null
    }

    return user
  } catch (err) {
    throw new Error(err.message)
  }
}

export default findUserById
