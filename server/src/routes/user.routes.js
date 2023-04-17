import { Router } from 'express'

import { deleteDeleteUser, getProfile, postUpdateEmail, postUpdateName, postUpdatePassword } from '#Controllers/user.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'
import validateUserUpdateNameDTO from '#DTO/userUpdateName.dto.js'
import validateUserUpdateEmailDTO from '#DTO/userUpdateEmail.dto.js'
import validateUserUpdatePasswordDTO from '#DTO/userUpdatePassword.dto.js'

const userRouter = Router()

userRouter.use(verifyUserJWT)

userRouter.get('/profile', getProfile)
userRouter.post('/update-name', validateUserUpdateNameDTO, postUpdateName)
userRouter.post('/update-email', validateUserUpdateEmailDTO, postUpdateEmail)
userRouter.post('/update-password', validateUserUpdatePasswordDTO, postUpdatePassword)
userRouter.delete('/delete', deleteDeleteUser)

export default userRouter
