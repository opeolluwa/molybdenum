import { faker } from "@faker-js/faker"

const mail = faker.internet.email()
const name = faker.name.lastName()
console.log(mail, name)
