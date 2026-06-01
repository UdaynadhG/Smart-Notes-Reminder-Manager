const reminder = require("../models/reminderModel")
const fileReader = require('filereader')
const fs = require('fs');
var moment = require('moment');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
cronJob = require('cron').CronJob;
var scheduler = require('node-schedule');
var randf = require('randomstring');
const jwt=require('jsonwebtoken')

const addImage =  async(req, res) => {
    console.log("in add img "+req.files.img[0])
    console.log("in add other "+req.files.other[0])
    const r1 = new reminder({
        idUser: req.body.idUser,
        rTitle: req.body.rTitle,
        rDesc: req.body.rDesc,
        type: req.body.type,
        rDate: req.body.rDate,
        rTime: req.body.rTime
        // img: {
        //     data: fs.readFileSync(req.files.img[0].path),
        //     // contentType: req.file.mimetype
        // },
        
    })

    await r1.save().then((result) => {
        res.status(200).json({
            data : result
        })
    }).catch(err => res.status(400).json({ msg : "error" }))
    
}


const sendingMessage= async(req,res) => {
    res.header('Content-Type', 'application/json');
    var mydate = new Date(req.body.rDate);
    console.log("mydate "+mydate);
    console.log("date "+mydate.getDate()+" month"+mydate.getMonth());
    // var mytime = new Date(req.body.rTime);

    var mytime = moment(req.body.rTime, ["h:mm A"]).format("HH:mm");
    let da=mydate.getDate();
    let mo=mydate.getMonth();
    let yy=mydate.getFullYear();
    let hr=mytime[0]+mytime[1];
    let min=mytime[3]+mytime[4];
    console.log("h "+hr+" m"+min);
    if(hr==='00')
        hr=mytime[0];
    

    var date = new Date(yy, mo, da, hr, min, 0);
    console.log("daghs "+date);
    var newYearJob = scheduler.scheduleJob(date, function() {
      console.log("Happy new year");
      client.messages
      .create({
        // from: process.env.TWILIO_PHONE_NUMBER,
        // to: req.body.to,
        // body: req.body.body
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+91'+req.body.idUser,
        body: "From ReminderService---  heyy hii finalyyyyy"
      })
      .then(() => {
          console.log("sent msg at "+Date.now());
        // res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        console.log("not sent msg at "+Date.now());
        // res.send(JSON.stringify({ success: false }));
      })

    });
}

    


const addReminderDetails = async(req, res) => {
    console.log("add "+req.body);
    var mydate = new Date(req.body.rDate);
    console.log("mydate "+mydate);
    console.log("date "+mydate.getDate()+" month"+mydate.getMonth());
    // var mytime = new Date(req.body.rTime);

    var mytime = moment(req.body.rTime, ["h:mm A"]).format("HH:mm");
    console.log("mytime "+mytime);
    console.log("hours "+mytime[0]+mytime[1]);
    console.log("minutes "+mytime[3]+mytime[4]);
    let da=mydate.getDate();
    let mo=mydate.getMonth();
    let yy=mydate.getFullYear();
    let hr=mytime[0]+mytime[1];
    let min=mytime[3]+mytime[4];
    console.log("nexttt "+da+" "+mo+" "+hr+" "+min);
    if(hr==='00')
        hr=mytime[0];
    console.log(`${min} ${hr} ${da} ${mo} *`);

    var date = new Date(yy, mo, da, hr, min, 0);
    console.log("daghs "+date);
    var jobId = randf.generate(10);
    // var unique_name=req.body.idUser+req.body.rDate;
    console.log("unique "+jobId);

    const r1 = new reminder({
        idUser: req.body.idUser,
        rTitle: req.body.rTitle,
        rDesc: req.body.rDesc,
        type: req.body.type,
        rDate: req.body.rDate,
        rTime: req.body.rTime,
        scheduleId: jobId
    })

   
    
    await r1.save().then((result) => {
        console.log("response");

        
        var list= scheduler.scheduledJobs;
        

        var newYearJob = scheduler.scheduleJob(jobId, date, function() {
            console.log("scheduled at "+Date.now());
            // list.push("job3");
            // console.log("list11 "+jsonObj);
            console.log('connection : %j', list);

            client.messages.create( { to:'+91'+req.body.idUser, from: process.env.TWILIO_PHONE_NUMBER, body:'Hello! You have a reminder please login to check!  ' }, function( err, data ) {});
            // const out= sendMsg(result);
            console.log("add updating");
            const r1 ={
                $set :{
                idUser: req.body.idUser,
                rTitle: req.body.rTitle,
                rDesc: req.body.rDesc,
                type: req.body.type,
                rDate: req.body.rDate,
                rTime: req.body.rTime,
                scheduleId: jobId,
                flag:true}
            }

             r1.save().then((result) => {
                console.log("updated");
            })

        }, null,true);

        // var textJob = new cronJob(`${min} ${hr} ${da} ${mo} *`, function(){
        //     console.log("scheduled at "+Date.now());
        //     client.messages.create( { to:'+91'+req.body.idUser, from: process.env.TWILIO_PHONE_NUMBER, body:'Hello! You have a reminder please login to check!' }, function( err, data ) {});
        // },  null, true);

        console.log('connection : %j', list);

        return result;
    }).catch((err) => {
            return -1;
    })

}

const getRemindersDetails = async(req, res) => {
    try{
        const output = await reminder.find()
        res.status(200).json({ data : output})
    }
    catch(error){
        res.status(400).json({ data : output, msg : "error"})
        console.log("getReminders error")
        throw error
    }
}

const getReminderByIdUser = async (req, res) => {
    const id1= req.params.idUser;

    const token=req.headers.authorization.split(" ")[1]
    const pl= await jwt.verify(token, "sssssss",(err, payload) => {
        if(err){
            return -1;
        }else{
            return payload
        }
    })
    if(pl==-1){
        return -1;
    }

    var output = await reminder.find({idUser : id1})
    return output
}

const getOneReminder= async (req, res) => {
    const id1= req.params.idReminder;
    var output = await reminder.findOne({idReminder : id1})
    return output
}

const updateReminderDetails = async (req, res) => {
    console.log("in update  id ");
    var jobId=req.body.scheduleId;
    
    var my_job = scheduler.scheduledJobs[jobId];
    console.log('connection : %j', my_job);
    scheduler.cancelJob(jobId);
    // my_job.cancel()
    // my_job.reschedule();
    // console.log('cancelled ');
    const id1 = req.params.idReminder;
    console.log("in update  id "+id1);


    console.log("update "+req.body);
    var mydate = new Date(req.body.rDate);
    console.log("mydate "+mydate);
    console.log("date "+mydate.getDate()+" month"+mydate.getMonth());
    // var mytime = new Date(req.body.rTime);

    var mytime = moment(req.body.rTime, ["h:mm A"]).format("HH:mm");
    console.log("mytime "+mytime);
    console.log("hours "+mytime[0]+mytime[1]);
    console.log("minutes "+mytime[3]+mytime[4]);
    let da=mydate.getDate();
    let mo=mydate.getMonth();
    let yy=mydate.getFullYear();
    let hr=mytime[0]+mytime[1];
    let min=mytime[3]+mytime[4];
    console.log("nexttt "+da+" "+mo+" "+hr+" "+min);
    if(hr==='00')
        hr=mytime[0];
    console.log(`${min} ${hr} ${da} ${mo} *`);

    var date = new Date(yy, mo, da, hr, min, 0);
    console.log("update date "+date);
    // console.log("in update")
    // console.log("id here "+id1)
    var r1= {
        $set : {
            idUser: req.body.idUser,
            rTitle: req.body.rTitle,
            rDesc: req.body.rDesc,
            type: req.body.type,
            rDate: req.body.rDate,
            rTime: req.body.rTime,
            flag: req.body.flag,
            scheduleId: jobId
        }
    };

    await reminder.updateOne({ idReminder : id1}, r1, function(err, res){
        if(err) throw err;
            // console.log("not updated")
        
        
        var list= scheduler.scheduledJobs;
        var newYearJob = scheduler.scheduleJob(jobId, date, function() {
            console.log("scheduled at "+Date.now());
            // list.push("job3");
            // console.log("list11 "+jsonObj);
            console.log('connection : %j', list);
            client.messages.create( { to:'+91'+req.body.idUser, from: process.env.TWILIO_PHONE_NUMBER, body:'Hello! You have a reminder please login to check!  ' }, function( err, data ) {});
            // const out= sendMsg(result);
        }, null,true);



        console.log('connection : %j', list);
        
        return r1;
    })

}

const deleteReminderDetails = async(req, res) => {
    const id1 = req.params.idReminder
    var output = await reminder.deleteOne({idReminder : id1}, function(err, res){
        if(err) throw err;
        console.log("deleted")

    })
}

module.exports = {addReminderDetails, getRemindersDetails, getReminderByIdUser,getOneReminder, updateReminderDetails, deleteReminderDetails}








// --method1
    // function task() {
    //     console.log("My First Cron Job task run at: " + new Date());
    //     client.messages.create( { to:'+917981471889', from: process.env.TWILIO_PHONE_NUMBER, body:'Hello! Hope you’re having a good day! Goodnight re!' }, function( err, data ) {});
    //     // console.log("Next task at: " + job.nextDates(1));
    //     // call onComplete method
    //     onComplete();
    // }
    // function onComplete() {
    //     console.log("Task completed");
        
    // }

// var job = new cronJob(`${min} ${hr} ${da} ${mo} *`, task,onComplete);
    // console.log("text nk "+JSON.stringify(job));
    // job.start();
    // console.log("add remind body "+JSON.stringify(req.body));
    // let c=0;
  

// --method2
// const sendNotification = async(req,res) =>{
//     console.log("body "+JSON.stringify(req.body));
//     let c=0;
//     var textJob = new cronJob( '48 0 * * *', function(){
//         client.messages.create( { to:'+919182770818', from: process.env.TWILIO_PHONE_NUMBER, body:'Hello! Hope you’re having a good day! Goodnight re!' }, function( err, data ) {});
//       },  null, true);
//       console.log("text "+JSON.stringify(textJob));
//       return res.send(JSON.stringify({ success: true }));
// }