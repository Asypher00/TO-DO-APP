const Todo = require("../models/Todos");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const jsonGenerate = require("../utils/helpers");

const deleteTodo = async (req, res) => {
    try {
        // Validate todoId
        if (!req.body.todoId) {
            return res.status(StatusCodes.BAD_REQUEST).json(
                jsonGenerate(StatusCodes.BAD_REQUEST, "Todo ID is required")
            );
        }

        // Find and delete the todo
        const todo = await Todo.findOneAndDelete({
            _id: req.body.todoId,
            userId: req.userData.userId,
        });

        if (todo) {
            // Remove the todo ID from the user's todos array
            const user = await User.findOneAndUpdate(
                { _id: req.userData.userId },
                { $pull: { todos: req.body.todoId } }
            );

            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json(
                    jsonGenerate(StatusCodes.NOT_FOUND, "User not found")
                );
            }

            return res.status(StatusCodes.OK).json(
                jsonGenerate(StatusCodes.OK, "Deleted", todo)
            );
        } else {
            return res.status(StatusCodes.NOT_FOUND).json(
                jsonGenerate(StatusCodes.NOT_FOUND, "Todo not found")
            );
        }
    } catch (error) {
        console.error("Error deleting todo:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            jsonGenerate(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong", error.message)
        );
    }
};

module.exports = deleteTodo;



// const Todo = require("../models/Todos")
// const User = require("../models/User")
// const { StatusCodes } = require("http-status-codes")
// const jsonGenerate = require("../utils/helpers")

// const deleteTodo = async (req, res) => {
//     try {
//         const todo = await Todo.findOneAndDelete({
//             _id: req.body.todoId,
//             userId: req.userData.userId
//         } 
//         )
//         if (todo){
//             const user = await User.findOneAndUpdate({
//                 _id: req.userData.userId,
//             },{
//                 $pull: {
//                     todos: req.body.todoId
//                 }
//             })
//             res.status(StatusCodes.OK).json(jsonGenerate(StatusCodes.OK,"Deleted",todo))
//         }
//     } catch (error) {
//         res.status(StatusCodes.BAD_REQUEST).json(jsonGenerate(StatusCodes.BAD_REQUEST,"Could Not Delete",))
//     }
// }

// module.exports = deleteTodo;