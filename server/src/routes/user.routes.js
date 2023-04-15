import { Router } from 'express'

import { deleteDeleteUser, getProfile, postUpdateEmail, postUpdateName, postUpdatePassword } from '#Controllers/user.controller.js'

import verifyJWT from '#DTO/userJWT.dto.js'
import validateUpdateNameDTO from '#DTO/userUpdateName.dto.js'
import validateUpdateEmailDTO from '#DTO/userUpdateEmail.dto.js'
import validateUpdatePasswordDTO from '#DTO/userUpdatePassword.dto.js'

const userRouter = Router()

userRouter.get('/profile', verifyJWT, getProfile)
userRouter.post('/update-name', verifyJWT, validateUpdateNameDTO, postUpdateName)
userRouter.post('/update-email', verifyJWT, validateUpdateEmailDTO, postUpdateEmail)
userRouter.post('/update-password', verifyJWT, validateUpdatePasswordDTO, postUpdatePassword)
userRouter.delete('/delete', verifyJWT, deleteDeleteUser)

export default userRouter
