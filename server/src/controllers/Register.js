const { StatusCodes } = require("http-status-codes")
const RegisterSchema = require("../validationSchema/RegisterSchema.js")
const jsonGenerate = require("../utils/helpers.js")
const User = require("../models/User.js")
const Register = async (req, res) => {
    const parsedPayload = RegisterSchema.safeParse(req.body);
    if(!parsedPayload.success){
        res.status(StatusCodes.BAD_REQUEST).json(jsonGenerate(StatusCodes.BAD_REQUEST, parsedPayload.error.issues[0].message, req.body))
        return;
    }

    const {name, username, email, password} = req.body ;
    const userExist = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (userExist){
        return res.status(StatusCodes.BAD_REQUEST).json(jsonGenerate(StatusCodes.BAD_REQUEST,"User Already Exists"))
    }
    // save to db
    try {
        const user = await User.create({ ...req.body })
        const token = user.createJWT();
        return res.status(StatusCodes.CREATED).json(jsonGenerate(StatusCodes.CREATED, "Registration Succesful", token))

    } catch (error) {
        console.log(error)
    }

}

module.exports = { Register }