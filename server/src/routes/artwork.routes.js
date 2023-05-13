import { Router } from 'express'

import { getAllArtworks, getAllArtworksByType, getArtworkById, postCreateArtwork } from '#Controllers/artwork.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'

import validateArtistCreateArtworkDTO from '#DTO/artistCreateArtwork.dto.js'

const artwokRouter = Router()

artwokRouter.post('/create', verifyUserJWT, validateArtistCreateArtworkDTO, postCreateArtwork)
artwokRouter.get('/find-all', getAllArtworks)
artwokRouter.get('/find-one/:artworkId', getArtworkById)
artwokRouter.get('/find-by-type/:type', getAllArtworksByType)

export default artwokRouter
