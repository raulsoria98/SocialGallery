import { Router } from 'express'

import { postCreateArtwork } from '#Controllers/artwork.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'

import validateArtistCreateArtworkDTO from '#DTO/artistCreateArtwork.dto.js'

const artwokRouter = Router()

artwokRouter.use(verifyUserJWT)

artwokRouter.post('/create', validateArtistCreateArtworkDTO, postCreateArtwork)

export default artwokRouter
