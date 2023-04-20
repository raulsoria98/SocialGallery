import { DataTypes } from 'sequelize'

import sequelize from '#Config/db.js'

const Artwork = sequelize.define('artwork', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 200]
    }
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

export default Artwork
