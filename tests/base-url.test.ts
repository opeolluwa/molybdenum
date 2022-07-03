import app from "../src/app"
import request from "supertest";



describe("GET / - a simple api endpoint", () => {
    it("Hello API Request", async () => {
        const response = await request(app).get("/");
        expect(response.text).toEqual("hey there");
        expect(response.statusCode).toEqual(200);
        
    });
});
