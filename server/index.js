import express from 'express'
import cors from 'cors'

import { PORT } from './lib/config.js'
import { sequelize } from './lib/db.js'

const app = express()

app.use(cors())

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
