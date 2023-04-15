import { Router } from 'express'

import { postLogin, postSignUp } from '#Controllers/auth.controller.js'

import validateLoginDTO from '#DTO/userLogin.dto.js'
import validateSignUpDTO from '#DTO/userSignUp.dto.js'

const authRouter = Router()

authRouter.post('/login', validateLoginDTO, postLogin)

authRouter.post('/sign-up', validateSignUpDTO, postSignUp)

export default authRouter
