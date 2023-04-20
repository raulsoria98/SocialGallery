import '#Config/env.js'
import httpServer from '#Config/http.js'
import associateModels from '#Utils/db/associateModels.js'
import connectDB from '#Utils/db/connectDB.js'
import syncDB from '#Utils/db/syncDB.js'

const bootstrap = async () => {
  await connectDB()
  associateModels()
  await syncDB({ force: false, alter: false })
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}

bootstrap()
