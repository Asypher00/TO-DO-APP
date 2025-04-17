const { StatusCodes } = require("http-status-codes")
const LoginSchema = require("../validationSchema/RegisterSchema.js")
const jsonGenerate = require("../utils/helpers.js")
const User = require("../models/User.js")

const Login = async (req, res)=>{
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(StatusCodes.BAD_REQUEST).json(jsonGenerate(StatusCodes.BAD_REQUEST,"User does not exist", req.body))
    }

    const user = await User.findOne({
        username,
    });

    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json(jsonGenerate(StatusCodes.BAD_REQUEST,"User does not exist", req.body))
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(StatusCodes.BAD_REQUEST).json(jsonGenerate(StatusCodes.BAD_REQUEST,"Invalid credentials", req.body))
    }

    const token = user.createJWT();
    return res.status(StatusCodes.OK).json(jsonGenerate(StatusCodes.OK,`Logged in as ${username}`, token))
}

module.exports = Login;