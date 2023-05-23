import httpStatusCodes from '#Enums/httpStatusCodes.js'
import validateSchema from '#Utils/validateSchema.js'
import UserRateArtworkDTOSchema from './schemas/userRateArtwork.schema.js'

const validateUserRateArtworkDTO = (req, res, next) => {
  const errors = validateSchema(req.body, UserRateArtworkDTOSchema)

  if (errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      errors
    })
  }

  return next()
}

export default validateUserRateArtworkDTO
