import express from 'express'

import userRouter from '#Routes/user.routes.js'
import authRouter from '#Routes/auth.routes.js'
import adminRouter from '#Routes/admin.routes.js'
import artwokRouter from '#Routes/artwork.routes.js'

import { logError, returnError } from '#Errors/errorHandler.js'

const expressApp = express()

expressApp.use(express.json())

expressApp.use('/auth', authRouter)
expressApp.use('/user', userRouter)
expressApp.use('/admin', adminRouter)
expressApp.use('/artwork', artwokRouter)

expressApp.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

expressApp.use(logError)
expressApp.use(returnError)

export default expressApp
