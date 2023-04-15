import express from 'express'
import userRouter from '#Routes/user.routes.js'
import authRouter from '#Routes/auth.routes.js'
import adminRouter from '#Routes/admin.routes.js'

const expressApp = express()

expressApp.use(express.json())

expressApp.use('/auth', authRouter)
expressApp.use('/user', userRouter)
expressApp.use('/admin', adminRouter)

expressApp.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

export default expressApp
