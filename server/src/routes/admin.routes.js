import { putAdminUpdateUserRole, deleteAdminDeleteUser } from '#Controllers/admin.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'
import verifyAdmin from '#Middlewares/verifyAdmin.js'

import validateAdminUpdateRoleDTO from '#DTO/adminUpdateRole.dto.js'
import validateAdminDeleteUserDTO from '#DTO/adminDeleteUser.dto.js'

import { Router } from 'express'

const adminRouter = Router()

adminRouter.use(verifyUserJWT, verifyAdmin)

adminRouter.put('/update-user-role', validateAdminUpdateRoleDTO, putAdminUpdateUserRole)
adminRouter.delete('/delete-user', validateAdminDeleteUserDTO, deleteAdminDeleteUser)

export default adminRouter
