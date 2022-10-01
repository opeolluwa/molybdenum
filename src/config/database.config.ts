import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
import path from "path"
dotenv.config()
console.log(process.env.DB_HOST)

//the database configuration goes here
export const AppDataSource = new DataSource({
  //the database driver see https://typeorm.io/#installation for other allowed values and setup
  type: "mysql",
  //the database host name, default to localhost
  host: String(process.env.DB_HOST) ? String(process.env.DB_HOST) : "localhost",
  //the database username
  username: process.env.DB_USER,
  //database password is the database access key
  password: process.env.DB_ACCESS_KEY,
  //database name
  database: process.env.DB_SCHEMA,
  //path to database models
  entities: [path.join(__dirname, "../models/*.ts")],
  //path to migrations folder
  migrations: [path.join(__dirname, "../migrations/*.ts")],
  //define a table "database_migrations" to hold database migrations
  migrationsTableName: "database_migration",
  //use database synchronization only in development
  // synchronize: (process.env.NODE_ENV === "production") ? false : true,
  synchronize: false,
  //allow logging in development only mode only
  logging: process.env.NODE_ENV === "production" ? false : true,
})
