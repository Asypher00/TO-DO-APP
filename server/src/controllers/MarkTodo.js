const Todo = require("../models/Todos")
const { StatusCodes } = require("http-status-codes")
const jsonGenerate = require("../utils/helpers")

const markTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate({
            _id: req.body.todoId,
            userId: req.userData.userId
        }, [{
            $set: {
                isCompleted:{
                    $eq:[false, "$isCompleted"]
                }
                }
            }]  
        )
        if (todo){
            res.status(StatusCodes.OK).json(jsonGenerate(StatusCodes.OK,"Updated",todo))
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(jsonGenerate(StatusCodes.BAD_REQUEST,"Could Not Update",))
    }
}

module.exports = markTodo;