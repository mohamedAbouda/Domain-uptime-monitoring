const app = require("../app");
const request = require("supertest")
const User = require("../models/user")
const bcrypt = require('bcrypt')
require("dotenv").config()


// beforeAll(async() => {
// });
const email = process.env.UNIT_TEST_EMAIL || 'test@unitTest.com'
const name = process.env.UNIT_TEST_NAME || 'unit test'
const password = process.env.UNIT_TEST_PASSWORD || '123456'


beforeEach(async() => {
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name: name,
        email: email,
        password: encryptedPassword,
        isVerified: 1,
    });
})

afterEach(async() => {
    var user = await User.findOne({ where: { email: email } });
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
                email: email,
                password: password
            });
        expect(res.body).toHaveProperty('user')
        expect(res.statusCode).toBe(200);

    });
});