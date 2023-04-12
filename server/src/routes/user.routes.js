import { Router } from 'express'

import User from '#Models/user.js'
import { authByEmailPassword, generateAuthToken } from '#Utils/auth.js'

import validateLoginDTO from '#DTO/user-login.dto.js'
import validateRegisterDTO from '#DTO/user-register.dto.js'
import verifyJWTDTO from '#DTO/user-jwt.dto.js'

const userRouter = Router()

userRouter.post('/login', validateLoginDTO, (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: 'Faltan campos'
    })
  }

  authByEmailPassword(email, password).then(user => {
    const { id, role } = user

    generateAuthToken({ id, role }).then(jwt => {
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
    const { id, role } = user
    generateAuthToken({ id, role }).then(jwt => {
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

userRouter.get('/profile', verifyJWTDTO, async (req, res) => {
  const { id } = req.user

  try {
    const user = await User.findOne({
      where: {
        id
      }
    })

    if (!user) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      })
    }

    return res.json({
      user
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
})

export default userRouter
