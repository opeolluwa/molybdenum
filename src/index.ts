import app from "./app"
import { AppDataSource } from "./config/database.config"
const PORT = Number(process.env.PORT) || 8000

try {
  //establish connection to database
  AppDataSource.initialize()
  console.log("Database Connection has been established successfully.")
} catch (error) {
  console.error("Unable to connect to the database:", error)
}

app.listen(PORT, () => {
  console.log("Ignition started on http://localhost:" + PORT)
})
