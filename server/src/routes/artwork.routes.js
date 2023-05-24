import { Router } from 'express'
import multer from 'multer'

import {
  getAllArtworks,
  getAllArtworksByType,
  getArtworkById,
  getUserRating,
  getArtworksByAuthorId,
  postCreateArtwork,
  postRateArtwork,
  deleteUserRating
} from '#Controllers/artwork.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'

import validateArtistCreateArtworkDTO from '#DTO/artistCreateArtwork.dto.js'
import validateUserRateArtworkDTO from '#DTO/userRateArtwork.dto.js'

const artwokRouter = Router()

artwokRouter.post('/create', verifyUserJWT, multer().single('file'), validateArtistCreateArtworkDTO, postCreateArtwork)
artwokRouter.post('/rate', verifyUserJWT, validateUserRateArtworkDTO, postRateArtwork)
artwokRouter.get('/find-all', getAllArtworks)
artwokRouter.get('/find-one/:artworkId', getArtworkById)
artwokRouter.get('/find-by-type/:type', getAllArtworksByType)
artwokRouter.get('/find-by-author/:authorId', getArtworksByAuthorId)
artwokRouter.get('/userRating/:artworkId', verifyUserJWT, getUserRating)
artwokRouter.delete('/rating/:artworkId', verifyUserJWT, deleteUserRating)

export default artwokRouter
