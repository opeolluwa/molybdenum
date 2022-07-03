import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import formidable from "formidable"

const app: Express = express();
//enable cors and other global middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
dotenv.config();
console.log("Parsed Environment Variables");
app.get("/", (req: Request, res: Response) => {
    res.send("hey there")
})



//mount the routes
routes(app)
export default app;