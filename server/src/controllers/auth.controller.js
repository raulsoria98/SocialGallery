import httpStatusCodes from '#Enums/httpStatusCodes.js'
import loginUser from '#Utils/auth/loginUser.js'
import signUpUser from '#Utils/auth/signUpUser.js'

export const postLogin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const jwt = await loginUser({ email, password })

    return res.json({
      jwt
    })
  } catch (err) {
    return next(err)
  }
}

export const postSignUp = async (req, res, next) => {
  const { email, password, name, isArtist } = req.body

  try {
    const jwt = await signUpUser({ email, password, name, isArtist })

    return res.status(httpStatusCodes.CREATED).json({
      jwt
    })
  } catch (err) {
    return next(err)
  }
}
