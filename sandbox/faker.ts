import { faker } from "@faker-js/faker"

let mail = faker.internet.email();
let name = faker.name.lastName()
console.log(mail, name);
