import express from 'express'
import userRouter from '#Routes/user.routes.js'
import authRouter from '#Routes/auth.routes.js'

const expressApp = express()

expressApp.use(express.json())

expressApp.use('/auth', authRouter)
expressApp.use('/user', userRouter)

expressApp.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

export default expressApp
