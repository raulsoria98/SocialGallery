import postUpdateUserRole from '#Controllers/admin.controller.js'
import validateUpdateRoleDTO from '#DTO/userUpdateRole.dto.js'
import verifyAdminJWT from '#Middlewares/verifyAdminJWT.js'
import verifyUserJWT from '#Middlewares/verifyUserJWT.js'
import { Router } from 'express'

const adminRouter = Router()

adminRouter.use(verifyUserJWT, verifyAdminJWT)

adminRouter.post('/update-user-role', validateUpdateRoleDTO, postUpdateUserRole)

export default adminRouter
