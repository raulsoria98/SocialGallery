import '#Config/env.js'
import httpServer from '#Config/http.js'
import { connectDB, syncDB } from '#Config/db.js'

const bootstrap = () => {
  connectDB().then(async () => {
    await syncDB({ force: false, alter: false })
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
}

bootstrap()
