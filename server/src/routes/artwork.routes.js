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
  deleteUserRating,
  deleteArtworkAsAuthor,
  getRatingsByArtworkId
} from '#Controllers/artwork.controller.js'

import verifyUserJWT from '#Middlewares/verifyUserJWT.js'

import validateArtistCreateArtworkDTO from '#DTO/artistCreateArtwork.dto.js'
import validateUserRateArtworkDTO from '#DTO/userRateArtwork.dto.js'

const artworkRouter = Router()

artworkRouter.post('/create', verifyUserJWT, multer().single('file'), validateArtistCreateArtworkDTO, postCreateArtwork)
artworkRouter.post('/rate', verifyUserJWT, validateUserRateArtworkDTO, postRateArtwork)
artworkRouter.get('/find-all', getAllArtworks)
artworkRouter.get('/find-one/:artworkId', getArtworkById)
artworkRouter.get('/find-by-type/:type', getAllArtworksByType)
artworkRouter.get('/find-by-author/:authorId', getArtworksByAuthorId)
artworkRouter.get('/ratings/:artworkId', getRatingsByArtworkId)
artworkRouter.get('/user-rating/:artworkId', verifyUserJWT, getUserRating)
artworkRouter.delete('/rating/:artworkId', verifyUserJWT, deleteUserRating)
artworkRouter.delete('/delete/:artworkId', verifyUserJWT, deleteArtworkAsAuthor)

export default artworkRouter
