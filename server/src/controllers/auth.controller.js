import { signUpUser, loginUser } from '#Utils/auth.js'

export const postLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const jwt = await loginUser({ email, password })

    if (!jwt) {
      return res.status(401).json({
        error: 'Email o contraseña incorrectos'
      })
    }

    return res.json({
      jwt
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
}

export const postSignUp = async (req, res) => {
  const { email, password, name } = req.body

  try {
    const jwt = await signUpUser({ email, password, name })

    if (!jwt) {
      return res.status(409).json({
        error: 'El usuario ya existe'
      })
    }

    return res.json({
      jwt
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
}
