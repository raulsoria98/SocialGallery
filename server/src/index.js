import express from 'express'
import cors from 'cors'

import { PORT } from '#Config/index.js'
import sequelize from '#Config/db.js'

import authRouter from '#Routes/auth.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.json([
    {
      id: '1',
      title: 'Album Review: When we all Fall asleep where do we go?'
    },
    {
      id: '2',
      title: 'Book Review: How can we escape this labyrinth of suffering?'
    },
    {
      id: '3',
      title: 'Documentary Review: How can we escape the rat race?'
    }
  ])
})

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port 3001')
  })
}).catch(err => {
  console.log(err)
})
