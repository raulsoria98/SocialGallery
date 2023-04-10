import express from 'express'
import authRouter from '#Routes/auth.js'

const expressApp = express()

expressApp.use(express.json())

expressApp.use('/auth', authRouter)

expressApp.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

export default expressApp
