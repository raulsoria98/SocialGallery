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

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected')
  } catch (err) {
    console.error(err)
  }
}

export const syncDB = async ({ force = false, alter = false }) => {
  try {
    await sequelize.sync({ force, alter })
    console.log('Database synced')
  } catch (err) {
    console.error(err)
  }
}

export default sequelize
