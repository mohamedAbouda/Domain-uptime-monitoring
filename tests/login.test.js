const app = require("../app");
const request = require("supertest");
const User = require("../models/user");
const bcrypt = require('bcrypt')


// beforeAll(async() => {
// });

beforeEach(async() => {
    encryptedPassword = await bcrypt.hash('123456', 10);
    const user = await User.create({
        name: 'unit test',
        email: 'test@unitTest.com',
        password: encryptedPassword,
        isVerified: 1,
    });
})

afterEach(async() => {
    var user = await User.findOne({ where: { email: 'test@unitTest.com' } });
    if (user) {
        await user.destroy()
    }
});

// afterAll(async() => {
// });

describe("POST login", () => {
    test("It should respond with an object of the user", async() => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@unitTest.com",
                password: "123456"
            });
        expect(res.body).toHaveProperty('user')
        expect(res.statusCode).toBe(200);

    });
});