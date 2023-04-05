import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3001
export const DB = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'test',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  port: process.env.DB_PORT || 3306
}
