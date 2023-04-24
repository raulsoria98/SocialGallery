import httpStatusCodes from '#Enums/httpStatusCodes.js'

import { createArtwork } from '#Utils/artwork/createArtwork.js'

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
