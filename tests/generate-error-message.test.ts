import { generateErrorMessage } from "../src/lib/generate-error-message";

test("Empty error message -> empty string  should be returned", () => {
    const error: any = {};
    const errorMessage = generateErrorMessage(error);
    expect(errorMessage.length).toBe(0);
})


test("non empty error message ->  string  should be returned", () => {
    const error: any = {
        email: "Email is required",
        password: "Password is required",
        firstname: "Firstname is required",
        lastname: "Lastname is required"
    };
    const errorMessage = generateErrorMessage(error);
    expect(errorMessage.length).toBeGreaterThan(0);
    expect(typeof errorMessage).toBe("string");
    expect(errorMessage).toContain("Email is required");
    expect(errorMessage).toContain("Password is required");
    expect(errorMessage).toContain("Firstname is required");
    expect(errorMessage).toContain("Lastname is required");
    expect(errorMessage).toContain("and");
    expect(errorMessage).toContain(",");
})