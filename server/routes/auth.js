import { Router } from 'express'
import { authByEmailPassword, authorizeByToken, generateAuthToken } from '../util/auth.js'
import User from '../models/user.js'

const authRouter = Router()

authRouter.post('/login', (req, res) => {
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

authRouter.post('/signup', (req, res) => {
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

authRouter.get('/auth-token', async (req, res) => {
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

export default authRouter
