import User from '#Models/user.js'
import { Router } from 'express'
import { authByEmailPassword, authorizeByToken, generateAuthToken } from '#Utils/auth.js'
import validateLoginDTO from '#DTO/user-login.dto.js'
import validateRegisterDTO from '#DTO/user-register.dto.js'

const userRouter = Router()

userRouter.post('/login', validateLoginDTO, (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: 'Faltan campos'
    })
  }

  authByEmailPassword(email, password).then(user => {
    const { id } = user
    generateAuthToken(id).then(jwt => {
      return res.json({
        jwt
      })
    }).catch(err => {
      return res.status(500).json({
        error: err.message
      })
    })
  }).catch(err => {
    return res.status(401).json({
      error: err.message
    })
  })
})

userRouter.post('/register', validateRegisterDTO, (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({
      error: 'Faltan campos'
    })
  }

  User.create({
    email,
    password,
    name,
    role: 'user',
    active: true
  }).then(user => {
    const { id } = user
    generateAuthToken(id).then(jwt => {
      return res.json({
        jwt
      })
    }).catch(err => {
      return res.status(500).json({
        error: err.message
      })
    })
  }).catch(err => {
    return res.status(500).json({
      error: err.message
    })
  })
})

userRouter.get('/auth-token', async (req, res) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      error: 'No autorizado'
    })
  }

  const [bearer, token] = authorization.split(' ')

  if (bearer !== 'Bearer') {
    return res.status(401).json({
      error: 'No autorizado'
    })
  }

  authorizeByToken(token).then(id => {
    return res.json({
      id
    })
  }).catch(err => {
    return res.status(401).json({
      error: err.message
    })
  })
})

export default userRouter
