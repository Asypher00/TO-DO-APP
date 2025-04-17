require("dotenv").config()
const express = require("express");
const connectDB  = require("./utils/connect")
const { apiRoute,apiProtected } = require("./utils/api")
const authMiddleware = require("./middlewares/AuthMiddleware")
const cors = require("cors")

const app = express()

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000

app.use("/api/v1/", apiRoute);
app.use("/api/v1/", authMiddleware,  apiProtected);

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>console.log(`Server is running on ${port}`))
    } catch (error) {
        console.error(error)
    }
}

start();
