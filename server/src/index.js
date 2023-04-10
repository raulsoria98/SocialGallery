import '#Config/env.js'
import httpServer from '#Config/http.js'
import { connectDB, syncDB } from '#Config/db.js'

const bootstrap = async () => {
  await connectDB().then(() => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
    syncDB({ force: false, alter: false })
  })
}

bootstrap()
