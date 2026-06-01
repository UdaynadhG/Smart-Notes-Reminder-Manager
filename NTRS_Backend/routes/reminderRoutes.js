const express = require("express")
const app= express()
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
require("dotenv").config('./.env')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
cronJob = require('cron').CronJob;
var moment = require('moment');
var scheduler = require('node-schedule');
const cron = require('node-cron');



const {addReminder,getAllReminders, getRemindersByIdUser, getReminder, updateReminder, deleteReminder} = require("../controllers/reminderController")
// const {sendNotification}=require("../services/reminderService");

app.post("/addReminder", addReminder)

// app.post('/schedule',sendNotification);

app.get("/getAllReminders", getAllReminders)

app.get("/getReminderByidUser/:idUser",getRemindersByIdUser)

app.get("/getReminder/:idReminder",getReminder)

app.put("/updateReminder/:idReminder",updateReminder)

app.delete("/deleteReminder/:idReminder", deleteReminder)



  app.post('/sendMessage', (req,res) => {
    res.header('Content-Type', 'application/json');
    client.messages
    .create({
      // from: process.env.TWILIO_PHONE_NUMBER,
      // to: req.body.to,
      // body: req.body.body
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+917981471889',
      body: "From ReminderService---  heyy hii you have a reminder"
    })
    .then(() => {
        console.log("done");
      // res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      console.log("not done");
      // res.send(JSON.stringify({ success: false }));
    });
    return res.send(JSON.stringify({ success: true }));

    
  })



  
module.exports= app