import User from '#Models/user.js'

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email
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

export default findUserByEmail
