import Sequelize from 'sequelize'

import { DB } from './config.js'

const sequelize = new Sequelize(
  DB.database,
  DB.user,
  DB.password,
  {
    dialect: 'mysql',
    host: DB.host,
    port: DB.port
  }
)

sequelize.authenticate().then(() => {
  console.log('DB::Connection has been established successfully.')
}).catch(err => {
  console.error('DB::Unable to connect to the database:', err)
})

export default sequelize
