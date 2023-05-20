import httpStatusCodes from '#Enums/httpStatusCodes.js'
import validateSchema from '#Utils/validateSchema.js'
import ArtistCreateArtworkDTOSchema from './schemas/artistCreateArtwork.schema.js'

const validateArtistCreateArtworkDTO = (req, res, next) => {
  const errors = validateSchema(req.body, ArtistCreateArtworkDTOSchema)

  // get file from multer
  const { file } = req

  // if file is not present
  if (!file) {
    errors.push('El archivo es requerido')
  } else {
    // if file is not an image
    if (!file.mimetype.startsWith('image')) {
      errors.push('El archivo debe ser una imagen')
    }

    // if file is too large
    if (file.size > 1024 * 1024 * 16) { // 16MB
      errors.push('El archivo debe pesar menos de 16MB')
    }
  }

  if (errors.length > 0) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      errors
    })
  }

  return next()
}

export default validateArtistCreateArtworkDTO
