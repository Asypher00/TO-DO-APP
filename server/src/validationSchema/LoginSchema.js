const zod = require("zod");

const loginUser = zod.object({
    username: zod.string()
        .min(6, { message: "Username must be 6 or more characters long" })
        .max(20, { message: "Username must be 20 or fewer characters long" })
        .trim(),
    password: zod.string()
        .min(6, { message: "Password must be 6 or more characters long" })   
        .max(100, { message: "Password must be 20 or fewer characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),       
})

module.exports = loginUser;