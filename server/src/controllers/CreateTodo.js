const Todo = require("../models/Todos");
const User = require("../models/User");
const todoSchema = require("../validationSchema/TodoSchema");
const { StatusCodes } = require("http-status-codes"); // Correct import
const jsonGenerate = require("../utils/helpers");

const createTodo = async (req, res) => {
    const { userId } = req.userData;

    // Validate the request body using Zod
    const parsedPayload = todoSchema.safeParse(req.body);
    if (!parsedPayload.success) {
        return res.status(StatusCodes.BAD_REQUEST).json(
            jsonGenerate(StatusCodes.BAD_REQUEST, parsedPayload.error.issues[0].message, req.body)
        );
    }

    const { title, description } = req.body;

    try {
        // Create a new Todo in the database
        const result = await Todo.create({
            userId,
            title,
            description
        });

        if(result){
            const user = await User.findOneAndUpdate({
                _id: userId
            },{
                $push: {todos: result}
            })
        }

        // Return success response
        res.status(StatusCodes.CREATED).json(
            jsonGenerate(StatusCodes.CREATED, "Todo Created", result)
        );
    } catch (error) {
        // Handle errors
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            jsonGenerate(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong", error.message)
        );
    }
};

module.exports = createTodo;



// const Todo = require("../models/Todos");
// const todoSchema = require("../validationSchema/TodoSchema")
// const StatusCodes = require("http-status-codes")
// const jsonGenerate = require("../utils/helpers")
// const createTodo = async (req, res) =>{
//     const { userId } = req.userData
//     const parsedPayload = todoSchema.safeParse(req.body)
//     if(!parsedPayload.success){
//         return res.status(StatusCodes.BAD_REQUEST).json(jsonGenerate(StatusCodes.BAD_REQUEST, parsedPayload.error.issues[0].message, req.body))
//     }
//     const {title, description} = req.body;

//     try {
//         const result = await Todo.create({
//             userId,
//             title,
//             description
//         });
//         res.status(StatusCodes.OK).json(jsonGenerate(StatusCodes.OK,"Todo Created",result))
//     } catch (error) {
//         return res.status(StatusCodes.NOT_IMPLEMENTED).json(jsonGenerate(StatusCodes.NOT_IMPLEMENTED,error, req.body))
//     }
// }

// module.exports = createTodo;