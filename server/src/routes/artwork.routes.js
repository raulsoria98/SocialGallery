import { Router } from 'express'

import { getAllArtworks, postCreateArtwork } from '#Controllers/artwork.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'

import validateArtistCreateArtworkDTO from '#DTO/artistCreateArtwork.dto.js'

const artwokRouter = Router()

artwokRouter.post('/create', verifyUserJWT, validateArtistCreateArtworkDTO, postCreateArtwork)
artwokRouter.get('/fetch-all', getAllArtworks)

export default artwokRouter
