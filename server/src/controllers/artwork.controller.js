import httpStatusCodes from '#Enums/httpStatusCodes.js'

import { createArtwork } from '#Utils/artwork/createArtwork.js'
import findAllArtworks from '#Utils/artwork/findAllArtworks.js'
import findArtworkById from '#Utils/artwork/findArtworkById.js'
import findArtworksByType from '#Utils/artwork/findArtworksByType.js'
import findArtworksByAuthorId from '#Utils/artwork/findArtworksByAuthorId.js'

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

  try {
    const { artworks, totalArtworks } = await findAllArtworks(pagination)

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

  try {
    const { artworks, totalArtworks } = await findArtworksByType(type, pagination)

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

  try {
    const { artworks, totalArtworks } = await findArtworksByAuthorId(authorId, pagination)

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
