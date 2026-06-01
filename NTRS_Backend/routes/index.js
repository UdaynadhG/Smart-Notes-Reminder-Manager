const express=require('express')
const app= express()
const userRoutes= require('./userRoutes')
const noteRoutes= require('./noteRoutes')
const reminderRoutes= require('./reminderRoutes')
const todolistRoutes= require('./todolistRoutes')

app.use('/user', userRoutes)
app.use('/notes',noteRoutes)
app.use('/reminders',reminderRoutes)
app.use('/todolist',todolistRoutes)


module.exports=app 