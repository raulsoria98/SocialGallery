import { Router } from 'express'

import verifyJWTDTO from '#DTO/user-jwt.dto.js'
import { getProfile } from '#Controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/profile', verifyJWTDTO, getProfile)

export default userRouter
