import httpStatusCodes from '#Enums/httpStatusCodes.js'

import { createArtwork } from '#Utils/artwork/createArtwork.js'
import fetchAllArtworks from '#Utils/artwork/fetchAllArtworks.js'

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

    return res.status(httpStatusCodes.OK).json({
      artworks
    })
  } catch (err) {
    return next(err)
  }
}
