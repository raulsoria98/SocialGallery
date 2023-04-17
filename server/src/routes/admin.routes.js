import { postAdminUpdateUserRole, deleteAdminDeleteUser } from '#Controllers/admin.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'
import verifyAdminJWT from '#Middlewares/verifyAdminJWT.js'

import validateAdminUpdateRoleDTO from '#DTO/adminUpdateRole.dto.js'
import validateAdminDeleteUserDTO from '#DTO/adminDeleteUser.dto.js'

import { Router } from 'express'

const adminRouter = Router()

adminRouter.use(verifyUserJWT, verifyAdminJWT)

adminRouter.post('/update-user-role', validateAdminUpdateRoleDTO, postAdminUpdateUserRole)
adminRouter.delete('/delete-user', validateAdminDeleteUserDTO, deleteAdminDeleteUser)

export default adminRouter
