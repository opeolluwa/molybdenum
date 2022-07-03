import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
import path from "path";
dotenv.config();
console.log(process.env.DB_HOST);

export const AppDataSource = new DataSource({
    type: "mysql",
    host: String(process.env.DB_HOST),
    username: process.env.DB_USER,
    password: process.env.DB_ACCESS_KEY,
    database: process.env.DB_SCHEMA,
    entities: [path.join(__dirname, "../models/*.ts")],
    synchronize: true,
    logging: false,
})
