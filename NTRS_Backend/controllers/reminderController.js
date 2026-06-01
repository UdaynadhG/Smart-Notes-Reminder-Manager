const { addReminderDetails, sendNotification,getRemindersDetails, getReminderByIdUser, getOneReminder ,updateReminderDetails, deleteReminderDetails }= require("../services/reminderService")

const addReminder = async(req, res) => {
    const output = await addReminderDetails(req);
    console.log("controller "+output);
    if(output===-1){
        console.log("coont if");
        return res.status(400).json({
            msg : "error in adding",
            code: 400
        })
        
    }else{
        console.log("coont else");
        return res.status(200).json({
            msg : "reminder inserted",
            code: 200
        });
    }
}


const getAllReminders = async(req, res) => {
    try{
        const output= await getRemindersDetails(req,res)
        res.status(200).json({
            data : output
        })
        console.log(output)
    }
    catch(err){
        res.status(400)
        // res.json(err)
        return
    }
}

const getRemindersByIdUser = async(req, res) => {
    try{
        const output = await getReminderByIdUser(req,res)
        if(output==-1){
            res.status(401).json({
                msg : "token expired",
                status: 401
            })
        }
        else{
            res.status(200).json({
                data : output,
                status: 200
            })
        }
       
    }catch(err){
        res.status(400).json({
            msg : "no such reminder exists"
        })
    }
}

const getReminder = async(req, res) => {
    try{
        const output = await getOneReminder(req,res)
        res.status(200).json({
            data : output
        })
    }catch(err){
        res.status(400).json({
            msg : "no such reminder exists"
        })
    }
}

const updateReminder = async(req, res) => {
    console.log("in controller update")
    try{
        const output = await updateReminderDetails(req, res)
        res.status(200).json({
            data : output,
            msg : "updated",
            code: 200
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            msg : "no such reminder to update",
            code: 400
        })
    }
}

const deleteReminder = async(req, res) => {
    try{
        await deleteReminderDetails(req, res)
        res.status(200).json({
            msg : "deleted",
            code: 200
        })
    }catch(err){
        res.status(400).json({
            msg : "no such reminder to delete",
            code: 400
        })
    }
}

module.exports = {addReminder, getAllReminders, getRemindersByIdUser, getReminder ,updateReminder, deleteReminder}