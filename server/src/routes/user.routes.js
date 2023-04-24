import { Router } from 'express'

import { deleteDeleteUser, getProfile, putUpdateEmail, putUpdateName, putUpdatePassword } from '#Controllers/user.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'
import validateUserUpdateNameDTO from '#DTO/userUpdateName.dto.js'
import validateUserUpdateEmailDTO from '#DTO/userUpdateEmail.dto.js'
import validateUserUpdatePasswordDTO from '#DTO/userUpdatePassword.dto.js'

const userRouter = Router()

userRouter.use(verifyUserJWT)

userRouter.get('/profile', getProfile)
userRouter.put('/update-name', validateUserUpdateNameDTO, putUpdateName)
userRouter.put('/update-email', validateUserUpdateEmailDTO, putUpdateEmail)
userRouter.put('/update-password', validateUserUpdatePasswordDTO, putUpdatePassword)
userRouter.delete('/delete', deleteDeleteUser)

export default userRouter
