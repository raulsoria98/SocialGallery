import httpStatusCodes from '#Enums/httpStatusCodes.js'
import validateSchema from '#Utils/validateSchema.js'
import UserUpdateIsArtistDTOSchema from './schemas/userUpdateIsArtist.schema.js'

const validateUserUpdateIsArtistDTO = (req, res, next) => {
  const errors = validateSchema(req.body, UserUpdateIsArtistDTOSchema)

  if (errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      errors
    })
  }

  return next()
}

export default validateUserUpdateIsArtistDTO
