import { Router } from 'express'

import { getProfile, postUpdateName } from '#Controllers/user.controller.js'

import verifyJWTDTO from '#DTO/userJWT.dto.js'
import verifyUpdateNameDTO from '#DTO/userUpdateName.dto.js'

const userRouter = Router()

userRouter.get('/profile', verifyJWTDTO, getProfile)
userRouter.post('/update-name', verifyJWTDTO, verifyUpdateNameDTO, postUpdateName)

export default userRouter
