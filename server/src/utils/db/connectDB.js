import sequelize from '#Config/db.js'

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected')
  } catch (err) {
    console.error(err)
  }
}

export default connectDB
