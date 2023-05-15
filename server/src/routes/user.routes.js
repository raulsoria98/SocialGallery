import { Router } from 'express'

import { deleteDeleteUser, getProfile, getUserData, putUpdateEmail, putUpdateIsArtist, putUpdateName, putUpdatePassword } from '#Controllers/user.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'
import validateUserUpdateNameDTO from '#DTO/userUpdateName.dto.js'
import validateUserUpdateEmailDTO from '#DTO/userUpdateEmail.dto.js'
import validateUserUpdatePasswordDTO from '#DTO/userUpdatePassword.dto.js'
import validateUserUpdateIsArtistDTO from '#DTO/userUpdateIsArtist.dto.js'

const userRouter = Router()

userRouter.get('/find/:id', getUserData)

userRouter.use(verifyUserJWT)

userRouter.get('/profile', getProfile)
userRouter.put('/update-name', validateUserUpdateNameDTO, putUpdateName)
userRouter.put('/update-email', validateUserUpdateEmailDTO, putUpdateEmail)
userRouter.put('/update-password', validateUserUpdatePasswordDTO, putUpdatePassword)
userRouter.put('/update-is-artist', validateUserUpdateIsArtistDTO, putUpdateIsArtist)
userRouter.delete('/delete', deleteDeleteUser)

export default userRouter
