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
    next(err)
  }
}

export const postSignUp = async (req, res, next) => {
  const { email, password, name } = req.body

  try {
    const jwt = await signUpUser({ email, password, name })

    return res.json({
      jwt
    })
  } catch (err) {
    next(err)
  }
}
