import { DataTypes } from 'sequelize'

import sequelize from '#Config/db.js'
import artworkTypes from '#Enums/artworkTypes.js'

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
      len: [2, 500]
    }
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [Object.values(artworkTypes)]
    }
  },
  file: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['title', 'authorId']
    }
  ]
})

export default Artwork
