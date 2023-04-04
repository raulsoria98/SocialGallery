const config = require('./config')
const db = config.db

const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  db.database,
  db.user,
  db.password,
  {
    dialect: 'mysql',
    host: db.host,
    port: db.port
  }
)

sequelize.authenticate().then(() => {
  console.log('DB::Connection has been established successfully.')
}).catch(err => {
  console.error('DB::Unable to connect to the database:', err)
})

module.exports = sequelize
