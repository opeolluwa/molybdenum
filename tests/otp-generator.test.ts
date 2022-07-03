import { addMinutesToDate } from "../src/lib/otp-generator";

test("add minutes to date", () => { 
    const now:Date = new Date();
    const expiration: number = (now.getTime()) + (10 * 60000);
    expect(addMinutesToDate(10)).toBe(expiration);
})
