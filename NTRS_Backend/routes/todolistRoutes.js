const express = require("express")
const app= express()

const {addTodolist, getAllTodolists,getTodolistsByIdUser, getTodolist, updateTodolists, deleteTodolists} = require("../controllers/todolistController")


app.post("/addTodolist",addTodolist)

app.get("/getAllTodolists", getAllTodolists)

app.get("/getTodolistByidUser/:idUser",getTodolistsByIdUser)

app.get("/getTodolist/:idTodo",getTodolist)

app.put("/updateTodolists/:idTodo", updateTodolists)

app.delete("/deleteTodolists/:idTodo", deleteTodolists)

module.exports = app