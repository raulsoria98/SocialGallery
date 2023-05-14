import { Router } from 'express'

import { getAllArtworks, getAllArtworksByType, getArtworkById, getArtworksByAuthorId, postCreateArtwork } from '#Controllers/artwork.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'

import validateArtistCreateArtworkDTO from '#DTO/artistCreateArtwork.dto.js'

const artwokRouter = Router()

artwokRouter.post('/create', verifyUserJWT, validateArtistCreateArtworkDTO, postCreateArtwork)
artwokRouter.get('/find-all', getAllArtworks)
artwokRouter.get('/find-one/:artworkId', getArtworkById)
artwokRouter.get('/find-by-type/:type', getAllArtworksByType)
artwokRouter.get('/find-by-author/:authorId', getArtworksByAuthorId)

export default artwokRouter
