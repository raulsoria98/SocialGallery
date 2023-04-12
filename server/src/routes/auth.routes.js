import { Router } from 'express'

import { postLogin, postRegister } from '#Controllers/auth.controller.js'

import validateLoginDTO from '#DTO/user-login.dto.js'
import validateRegisterDTO from '#DTO/user-register.dto.js'

const authRouter = Router()

authRouter.post('/login', validateLoginDTO, postLogin)

authRouter.post('/register', validateRegisterDTO, postRegister)

export default authRouter
