const express = require("express")
const app= express()
var cors = require('cors');
app.use(cors())

var bodyParser = require('body-parser');
var fs = require('fs');
require('dotenv/config');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

var multer = require('multer');

app.use(express.static(__dirname ))
console.log(__dirname)

var upload = multer({dest:'uploads/'});

const {addNotes, getAllNotes, updateNotes, deleteNotes, getNote, getNotesByIdUser} = require("../controllers/noteController")


app.post("/addNotes",upload.fields([{ name: 'noteImg'}, {name: 'noteFile'}]),addNotes)

app.get("/getAllNotes", getAllNotes)

app.get("/getNoteByidUser/:idUser",getNotesByIdUser)

app.get("/getNote/:idNote",getNote)

app.put("/updateNotes/:idNote",upload.fields([{ name: 'noteImg'}, {name: 'noteFile'}]), updateNotes)

app.delete("/deleteNotes/:idNote", deleteNotes)

module.exports = app