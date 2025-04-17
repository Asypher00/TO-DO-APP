const User = require("../models/User")
const { StatusCodes } = require("http-status-codes")
const jsonGenerate = require("../utils/helpers")

const getAllTodos = async (req, res) => {
    try {
        const list = await User.findById(req.userData.userId)
        .select("-password")
        .populate("todos")
        
        return res.status(StatusCodes.OK).json(jsonGenerate(StatusCodes.OK,"All Todos", list))
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(jsonGenerate(StatusCodes.INTERNAL_SERVER_ERROR,"Internal Server Error", error))
    }
}

module.exports = getAllTodos;