const { StatusCodes } = require("http-status-codes");
const jsonGenerate = require("../utils/helpers")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    console.log("authHeader", authHeader)
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(StatusCodes.BAD_REQUEST).json(jsonGenerate(StatusCodes.BAD_REQUEST, "Invalid Token"))
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JwT_SECRET)
        console.log(payload);
        req.userData = {
            userId: payload.userId,
            username: payload.username,
            name: payload.name
        }
        next();
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(jsonGenerate(StatusCodes.BAD_REQUEST, "Invalid Token"))
    }

}

module.exports = authMiddleware ;  