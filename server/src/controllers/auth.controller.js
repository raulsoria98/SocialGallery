import { signUpUser, loginUser } from '#Utils/auth.js'

export const postLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const jwt = await loginUser({ email, password })

    return res.json({
      jwt
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.message
    })
  }
}

export const postSignUp = async (req, res) => {
  const { email, password, name } = req.body

  try {
    const jwt = await signUpUser({ email, password, name })

    return res.json({
      jwt
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.message
    })
  }
}
