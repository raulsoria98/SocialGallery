const express = require('express')
// const mysql = require('mysql2')
const cors = require('cors')

const sequelize = require('./lib/db')

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
  app.listen(3001, () => {
    console.log('Server is running on port 3001')
  })
}).catch(err => {
  console.log(err)
})
