const express = require("express")
const app= express()
var cors = require('cors');
app.use(cors())
require('dotenv/config');


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const {addUser,login, getUsers, getOneUser, updateUser, deleteUser, getUserDetailsTotal} = require("../controllers/userController")

app.post("/addUser", addUser)

app.post("/loginUser",login);

app.get("/getAllUsers", getUsers)

app.get("/getUser/:idUser",getOneUser)

app.put("/updateUser/:idUser",updateUser)

app.delete("/deleteUser/:idUser", deleteUser)

// app.get("/getAllUserDetails/:idUser",getUserDetailsTotal);
app.post('/create', (req, res) => {
    console.log('task post methkd ');
    // task.start();
    
    client.verify.services.create({code_length: 4,do_not_share_warning_enabled: true,friendlyName: 'My Verify Service'})
    .then(service => {console.log("send "+service.sid);
                        });
  });

  

  // var schedule = require('node-schedule');

  // var j = schedule.scheduleJob('42 * * * *', function(){
  //   console.log('The answer to life, the universe, and everything!');
  // });

  app.post('/sendCode', (req, res) => {
    console.log("sendcode "+req.body.phone);
    client.verify.services('VA688057bc9e6fb58fb120528d490f2db0')
             .verifications
             .create({to: req.body.phone, channel: 'sms'})
             .then(verification => {
              console.log("verify "+verification);
              console.log(verification.sid);
              res.send(JSON.stringify({ success: true, msg: "sent" }))
            }).catch(err =>{
              res.send(JSON.stringify({ success: true, msg: "notsent" }))
            });
  });

   
  app.post('/verifyCode', (req, res)   =>{
    console.log("code "+req.body.code);
    console.log("verifycode "+req.body.phone);
    client.verify.services('VA688057bc9e6fb58fb120528d490f2db0')
        .verificationChecks
        .create({to: req.body.phone, code: req.body.code})
        .then(verification_check => { 
          console.log(verification_check.status)
          if(verification_check.status === "pending"){
            res.send(JSON.stringify({ success: false , msg: "pending"}))
          }else{
            res.send(JSON.stringify({ success: true , msg:"approved"}))
          }
          
      }).catch(err =>{
        res.send(JSON.stringify({ success: true, msg: "pending" }))
      });

  });

module.exports= app