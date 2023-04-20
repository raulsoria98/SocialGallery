import sequelize from '#Config/db.js'

const syncDB = async ({ force = false, alter = false }) => {
  try {
    await sequelize.sync({ force, alter })
    console.log('Database synced')
  } catch (err) {
    console.error(err)
  }
}

export default syncDB
