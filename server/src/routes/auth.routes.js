import { Router } from 'express'

import { postLogin, postSignUp } from '#Controllers/auth.controller.js'

import validateLoginDTO from '#DTO/login.dto.js'
import validateSignUpDTO from '#DTO/signUp.dto.js'

const authRouter = Router()

authRouter.post('/login', validateLoginDTO, postLogin)

authRouter.post('/sign-up', validateSignUpDTO, postSignUp)

export default authRouter
