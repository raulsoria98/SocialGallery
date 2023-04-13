import { Router } from 'express'

import { postLogin, postRegister } from '#Controllers/auth.controller.js'

import validateLoginDTO from '#DTO/userLogin.dto.js'
import validateRegisterDTO from '#DTO/userRegister.dto.js'

const authRouter = Router()

authRouter.post('/login', validateLoginDTO, postLogin)

authRouter.post('/register', validateRegisterDTO, postRegister)

export default authRouter
