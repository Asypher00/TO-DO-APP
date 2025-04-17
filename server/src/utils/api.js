const express = require("express");
const { Register } = require("../controllers/Register")
const Login = require("../controllers/Login") 
const createTodo = require("../controllers/CreateTodo")
const getAllTodos = require("../controllers/GetAllTodos")
const markTodo = require("../controllers/MarkTodo")
const deleteTodo = require("../controllers/DeleteTodo")

const apiRoute = express.Router();
const apiProtected = express.Router();

apiRoute.post("/register", Register)
apiRoute.post("/login", Login)

apiProtected.post("/createTodo", createTodo)
apiProtected.get("/getAllTodos", getAllTodos )
apiProtected.post("/markTodo", markTodo )
apiProtected.post("/deleteTodo", deleteTodo)

module.exports = { apiRoute, apiProtected } ; 