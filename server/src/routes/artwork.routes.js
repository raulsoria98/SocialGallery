import { Router } from 'express'

import { getTest } from '#Controllers/artwork.controller.js'

const artwokRouter = Router()

artwokRouter.get('/', getTest)

export default artwokRouter
