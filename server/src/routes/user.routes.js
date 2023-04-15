import { Router } from 'express'

import { deleteDeleteUser, getProfile, postUpdateEmail, postUpdateName, postUpdatePassword } from '#Controllers/user.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'
import validateUpdateNameDTO from '#DTO/userUpdateName.dto.js'
import validateUpdateEmailDTO from '#DTO/userUpdateEmail.dto.js'
import validateUpdatePasswordDTO from '#DTO/userUpdatePassword.dto.js'

const userRouter = Router()

userRouter.get('/profile', verifyUserJWT, getProfile)
userRouter.post('/update-name', verifyUserJWT, validateUpdateNameDTO, postUpdateName)
userRouter.post('/update-email', verifyUserJWT, validateUpdateEmailDTO, postUpdateEmail)
userRouter.post('/update-password', verifyUserJWT, validateUpdatePasswordDTO, postUpdatePassword)
userRouter.delete('/delete', verifyUserJWT, deleteDeleteUser)

export default userRouter
