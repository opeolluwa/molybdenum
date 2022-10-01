import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import cors from "cors"
import routes from "./routes"
import morgan from "morgan"
import helmet from "helmet";
import path from "path"

const app: Express = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//use different logging style for development and production
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"))
//use helmet for header security
app.use(helmet());
//enable Cross Origin Resource Sharing (CORS)
app.use(cors());
//read environment variables
dotenv.config();
console.log("Parsed Environment Variables")
app.all("/", (req: Request, res: Response) => {
  // res.send("hey there")
  const filePath = path.join(__dirname, "../molybdenum.html");
  return res.sendFile(filePath);
})

//mount the routes
routes(app)
export default app
