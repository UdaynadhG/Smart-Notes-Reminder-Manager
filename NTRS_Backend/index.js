const express= require('express')
const mongoose= require('mongoose')
const app= express()
const routes= require('./routes/index')
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

var cors= require('cors')
app.use(cors())
require("dotenv").config('./.env')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.set('view engine','ejs')
const pino = require('express-pino-logger')();
app.use(pino);
// const client = require('twilio')(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// // );


mongoose.connect(
    "mongodb+srv://Shivanii:Database@123@trail.simt2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&keepAlive=true&autoReconnect=true",
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(()=> {
    console.log("Connected to db!")
})

app.use('/', routes)

app.listen(process.env.PORT || 3300, () => {
    console.log("listening at 3300")
    // console.log("en vvar "+process.env.TWILIO_PHONE_NUMBER);

})