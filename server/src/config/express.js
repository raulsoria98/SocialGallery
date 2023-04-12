import express from 'express'
import userRouter from '#Routes/user.routes.js'

const expressApp = express()

expressApp.use(express.json())

expressApp.use('/user', userRouter)

expressApp.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

export default expressApp
