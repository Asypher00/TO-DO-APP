const zod = require("zod");

const todo = zod.object({
    title: zod.string()
        .max(50,{ message: "Description should be less than 50 words"}),
    description: zod.string()
        .max(200,{ message: "Description should be less than 200 words"}),
    isCompleted: zod.boolean().default(false)
})

module.exports = todo; 