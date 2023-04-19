import httpStatusCodes from '#Enums/httpStatusCodes.js'

export const returnError = (err, req, res, next) => {
  return res.status(err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [err.message]
  })
}

export const logError = (err, req, res, next) => {
  console.error(err)
  next(err)
}
