import { Router } from 'express'

import { deleteDeleteUser, getProfile, postUpdateEmail, postUpdateName, postUpdatePassword } from '#Controllers/user.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'
import validateUpdateNameDTO from '#DTO/userUpdateName.dto.js'
import validateUpdateEmailDTO from '#DTO/userUpdateEmail.dto.js'
import validateUpdatePasswordDTO from '#DTO/userUpdatePassword.dto.js'

const userRouter = Router()

userRouter.use(verifyUserJWT)

userRouter.get('/profile', getProfile)
userRouter.post('/update-name', validateUpdateNameDTO, postUpdateName)
userRouter.post('/update-email', validateUpdateEmailDTO, postUpdateEmail)
userRouter.post('/update-password', validateUpdatePasswordDTO, postUpdatePassword)
userRouter.delete('/delete', deleteDeleteUser)

export default userRouter
