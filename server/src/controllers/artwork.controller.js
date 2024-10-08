import httpStatusCodes from '#Enums/httpStatusCodes.js'

import createArtwork from '#Utils/artwork/createArtwork.js'
import findAllArtworks from '#Utils/artwork/findAllArtworks.js'
import findArtworkById from '#Utils/artwork/findArtworkById.js'
import findArtworksByType from '#Utils/artwork/findArtworksByType.js'
import findArtworksByAuthorId from '#Utils/artwork/findArtworksByAuthorId.js'
import rateArtwork from '#Utils/artwork/rateArtwork.js'
import findRatingByUserArtwork from '#Utils/artwork/findRatingByUserArtwork.js'
import deleteRating from '#Utils/artwork/deleteRating.js'
import deleteArtwork from '#Utils/artwork/deleteArtwork.js'
import findRatingsByArtworkId from '#Utils/artwork/findRatingsByArtworkId.js'

export const postCreateArtwork = async (req, res, next) => {
  const { id: authorId } = req.user
  const { title, description, type } = req.body
  const { file } = req

  try {
    const artwork = await createArtwork({ authorId, title, description, type, file })

    return res.status(httpStatusCodes.CREATED).json({
      artwork
    })
  } catch (err) {
    return next(err)
  }
}

export const getAllArtworks = async (req, res, next) => {
  // Si hay page y pageSize en el query, se los asignamos a la variable pagination
  const pagination = req.query.page && req.query.pageSize ? { page: parseInt(req.query.page), pageSize: parseInt(req.query.pageSize) } : {}
  const sort = req.query.sort ? req.query.sort === 'true' : false

  try {
    const { artworks, totalArtworks } = await findAllArtworks(pagination, sort)

    if (!artworks.length) {
      const error = new Error('No se encontraron obras de arte')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    return res.status(httpStatusCodes.OK).json({
      artworks,
      totalArtworks
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

export const getAllArtworksByType = async (req, res, next) => {
  const { type } = req.params
  // Si hay page y pageSize en el query, se los asignamos a la variable pagination
  const pagination = req.query.page && req.query.pageSize ? { page: parseInt(req.query.page), pageSize: parseInt(req.query.pageSize) } : {}
  const sort = req.query.sort ? req.query.sort === 'true' : false

  try {
    const { artworks, totalArtworks } = await findArtworksByType(type, pagination, sort)

    if (!artworks.length) {
      const error = new Error(`No se encontraron obras del tipo ${type}`)
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    return res.status(httpStatusCodes.OK).json({
      artworks,
      totalArtworks
    })
  } catch (err) {
    return next(err)
  }
}

export const getArtworksByAuthorId = async (req, res, next) => {
  const { authorId } = req.params
  // Si hay page y pageSize en el query, se los asignamos a la variable pagination
  const pagination = req.query.page && req.query.pageSize ? { page: parseInt(req.query.page), pageSize: parseInt(req.query.pageSize) } : {}
  const sort = req.query.sort ? req.query.sort === 'true' : false

  try {
    const { artworks, totalArtworks } = await findArtworksByAuthorId(authorId, pagination, sort)

    if (!artworks.length) {
      const error = new Error('No se encontraron obras del autor')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    return res.status(httpStatusCodes.OK).json({
      artworks,
      totalArtworks
    })
  } catch (err) {
    return next(err)
  }
}

export const getRatingsByArtworkId = async (req, res, next) => {
  const { artworkId } = req.params

  try {
    const ratings = await findRatingsByArtworkId({ artworkId })

    if (!ratings.length) {
      const error = new Error('No se encontraron valoraciones para esta obra')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    return res.status(httpStatusCodes.OK).json({
      ratings
    })
  } catch (err) {
    return next(err)
  }
}

export const postRateArtwork = async (req, res, next) => {
  const { id: userId } = req.user
  const { artworkId, score, comment } = req.body

  try {
    const rating = await rateArtwork({ userId, artworkId, score, comment })

    return res.status(httpStatusCodes.CREATED).json({
      rating
    })
  } catch (err) {
    return next(err)
  }
}

export const getUserRating = async (req, res, next) => {
  const { id: userId } = req.user
  const { artworkId } = req.params

  try {
    const rating = await findRatingByUserArtwork({ userId, artworkId })

    return res.status(httpStatusCodes.OK).json({
      rating
    })
  } catch (err) {
    return next(err)
  }
}

export const deleteUserRating = async (req, res, next) => {
  const { id: userId } = req.user
  const { artworkId } = req.params

  try {
    const rating = await deleteRating({ userId, artworkId })

    return res.status(httpStatusCodes.OK).json({
      rating
    })
  } catch (err) {
    return next(err)
  }
}

export const deleteArtworkAsAuthor = async (req, res, next) => {
  const { id: authorId } = req.user
  const { artworkId } = req.params

  try {
    // Verificamos que el usuario sea el autor de la obra
    const artwork = await findArtworkById(artworkId)

    if (!artwork) {
      const error = new Error('No se encontró la obra de arte')
      error.statusCode = httpStatusCodes.NOT_FOUND
      throw error
    }

    if (artwork.authorId !== authorId) {
      const error = new Error('No tienes permisos para eliminar esta obra')
      error.statusCode = httpStatusCodes.FORBIDDEN
      throw error
    }

    const artworkDeleted = await deleteArtwork({ artworkId })

    return res.status(httpStatusCodes.OK).json({
      artworkDeleted
    })
  } catch (err) {
    return next(err)
  }
}
