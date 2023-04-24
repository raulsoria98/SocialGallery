import httpStatusCodes from '#Enums/httpStatusCodes.js'

import { createArtwork } from '#Utils/artwork/createArtwork.js'
import findAllArtworks from '#Utils/artwork/findAllArtworks.js'
import findArtworkById from '#Utils/artwork/findArtworkById.js'
import findArtworksByType from '#Utils/artwork/findArtworkByType.js'

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
    const artworks = await findAllArtworks()

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

    return res.status(httpStatusCodes.OK).json({
      artwork
    })
  } catch (err) {
    return next(err)
  }
}

export const getAllByType = async (req, res, next) => {
  const { type } = req.params

  try {
    const artworks = await findArtworksByType(type)

    return res.status(httpStatusCodes.OK).json({
      artworks
    })
  } catch (err) {
    return next(err)
  }
}
