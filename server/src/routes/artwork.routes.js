import { Router } from 'express'

import { getAllArtworks, getArtworkById, postCreateArtwork } from '#Controllers/artwork.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'

import validateArtistCreateArtworkDTO from '#DTO/artistCreateArtwork.dto.js'

const artwokRouter = Router()

artwokRouter.post('/create', verifyUserJWT, validateArtistCreateArtworkDTO, postCreateArtwork)
artwokRouter.get('/fetch-all', getAllArtworks)
artwokRouter.get('/fetch-one/:artworkId', getArtworkById)

export default artwokRouter
