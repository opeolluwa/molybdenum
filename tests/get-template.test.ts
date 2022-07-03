import { Templates } from "../src/lib/get-template";

test("Email template parser -> HTML should be returned", async () => {
    const template  = await Templates.getTemplate("welcome", {
        name: "Opeoluwa",
    });
    // expect(template).toBeDefined();
    expect(template).toBeDefined();
    expect(template.length).toBeDefined();
    expect(template.length).toBeGreaterThan(0);
})