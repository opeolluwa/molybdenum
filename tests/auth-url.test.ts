import { faker } from "@faker-js/faker"
import app from "../src/app"
import request from "supertest"
import { AppDataSource } from "../src/config/database.config"
import dotenv from "dotenv"
dotenv.config()
console.log("parsed environment variables: ")

describe("POST/v1/auth/register - register user endpoint ", () => {
  it("Hello API Request", async () => {
    const data = {
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
    }
    const response: any = await request(app)
      .post(`v1/auth/register`)
      .send({ ...data })
      .set("Accept", "application/json")
    expect(response).toBeDefined()
  })
})
