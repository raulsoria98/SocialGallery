import httpStatusCodes from '#Enums/httpStatusCodes.js'

import { createArtwork } from '#Utils/artwork/createArtwork.js'
import fetchAllArtworks from '#Utils/artwork/fetchAllArtworks.js'
import findArtworkById from '#Utils/artwork/findArtworkById.js'

export const postCreateArtwork = async (req, res, next) => {
  const { id: authorId } = req.user
  const { title, description, type } = req.body

  try {
    const artwork = await createArtwork({ authorId, title, description, type })

    return res.status(httpStatusCodes.CREATED).json({
      artwork
    })
  } catch (err) {
    return next(err)
  }
}

export const getAllArtworks = async (req, res, next) => {
  try {
    const artworks = await fetchAllArtworks()

    if (!artworks) {
      const error = new Error('No se encontraron obras de arte')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    return res.status(httpStatusCodes.OK).json({
      artworks
    })
  } catch (err) {
    return next(err)
  }
}

export const getArtworkById = async (req, res, next) => {
  const { artworkId } = req.params

  try {
    const artwork = await findArtworkById(artworkId)

    if (!artwork) {
      const error = new Error('No se encontró la obra de arte')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    return res.status(httpStatusCodes.OK).json({
      artwork
    })
  } catch (err) {
    return next(err)
  }
}
