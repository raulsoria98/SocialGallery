import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
)

export const connectDB = () => {
  return sequelize.authenticate().then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })
}

export const syncDB = (force = false, alter = false) => {
  return sequelize.sync({ force, alter }).then(() => {
    console.log('Database synced')
  }).catch(err => {
    console.error(err)
  })
}

export default sequelize
