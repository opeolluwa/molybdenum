import dotenv from "dotenv"
import { Mailer } from "../src/lib/mailer"
dotenv.config()

test("Email library", async () => {
  const response = await Mailer.sendMail({
    email: String(process.env.TEST_EMAIL),
    subject: "Test email",
    template: "welcome",
    data: {
      name: "Opeoluwa",
    },
  })

  expect(response).toBeDefined()
})
