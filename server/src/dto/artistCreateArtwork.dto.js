import httpStatusCodes from '#Enums/httpStatusCodes.js'
import validateSchema from '#Utils/validateSchema.js'
import ArtistCreateArtworkDTOSchema from './schemas/artistCreateArtwork.schema.js'

const validateArtistCreateArtworkDTO = (req, res, next) => {
  const errors = validateSchema(req.body, ArtistCreateArtworkDTOSchema)

  if (errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      errors
    })
  }

  return next()
}

export default validateArtistCreateArtworkDTO
