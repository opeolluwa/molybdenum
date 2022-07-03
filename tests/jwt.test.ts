import { Jwt } from "../src/lib/jwt";

test("generate json web token", async () => {
    const payload = { id: "1", email: "example@mailer.com" }
    const token = await Jwt.encode(payload)
    expect(token).toBeDefined()
    expect(token.length).toBeGreaterThan(10)
})



test("verify json web token", async () => {
    const payload = { id: "1", email: "example@mailer.com" }
    const token = await Jwt.encode(payload)
    const decoded = await Jwt.decode(token.toString())
    expect(decoded).toBeDefined()
    expect(decoded.id).toBe(payload.id)
    expect(decoded.email).toBe(payload.email)
})


