const user = require("../models/userModel")
const note = require("../models/noteModel")
const todolist = require("../models/todolistModel")
const reminder = require("../models/reminderModel")
const fileReader = require('filereader')
const fs = require('fs');
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

const addImage =  async(req, res) => {
    console.log("in add img "+req.files.img[0])
    console.log("in add other "+req.files.other[0])
    const s1 = new student({
        idUser: req.body.idUser,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
        // img: {
        //     data: fs.readFileSync(req.files.img[0].path),
        //     // contentType: req.file.mimetype
        // },
        
    })
    await s1.save().then((result) => {
        res.status(200).json({
            data : result
        })
    }).catch(err => res.status(400).json({ msg : "error" }))
    
}


const addUserDetails = async(req, res) => {
    const encryptPasswd=await bcryptjs.hash(req.body.password,10)
    const u1 = new user({
        idUser: req.body.idUser,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: encryptPasswd
    })

    await u1.save().then((result) => {
        return result;
    }).catch((err) => {
            return -1;
    })
}

const loginUser= async(req,res) => {
    const phn=req.body.phone;
    const passwd=req.body.password;
    console.log("pass "+passwd);
    const u1=await user.findOne({idUser:phn})
    console.log("user "+u1);
    if(u1!=null){
        console.log("comparing");
        if(await bcryptjs.compare(passwd, u1.password)){
            console.log("logged in");
            const token=await generateToken({phn})
            return token;
        }else{
            return -1;
        }
    }else{
        return -2;
    }
}

const generateToken = async(payload) => {
    return await jwt.sign(payload, "sssssss", { expiresIn: 1800});
}

const getUsersDetails = async(req, res) => {
    try{
        const output = await user.find()
        res.status(200).json({ data : output})
    }
    catch(error){
        res.status(400).json({ data : output, msg : "error"})
        console.log("getStudents error")
        throw error
    }
}

const getUserById = async (req, res) => {
    const id1= req.params.idUser;
    var output = await user.findOne({idUser : id1})
    return output
}

const updateUserDetails = async (req, res) => {
    console.log("in update")
    const id1 = req.params.idUser;
    const encryptPasswd=await bcryptjs.hash(req.body.password,10)
    // console.log("in update")
    // console.log("id here "+id1)
    var user1= {
        $set : {
            idUser: req.body.idUser,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: encryptPasswd
        }
    };

    await user.updateOne({ idUser : id1}, user1, function(err, res){
        if(err) throw err;
            // console.log("not updated")
        return user1;
    })

}

const deleteUserDetails = async(req, res) => {
    const id1 = req.params.idUser
    var output = await user.deleteOne({idUser : id1}, function(err, res){
        if(err) throw err;
        console.log("deleted")
    })
}

const getAllUserDetails = async(req,res) => {
    const id= req.body.idUser
    console.log("all "+id);
    var output = await user.findOne({idUser : id})
    var output1 = await note.find({idUser : id})
    var output2 = await reminder.find({idUser : id});
    var output3 = await todolist.find({idUser : id})

    var notes = [];
    var reminders = [];
    var todos = [];
    var details = {};
    details.user=output;

    for(var i in output1) {
        let item = output1[i];
        notes.push({ 
            "idNote" : item.idNote,
            "idUser"  : item.idUser,
            "noteTitle"    : item.noteTitle,
            "noteDesc"    : item.noteDesc 
        });
    }
    for(var i in output2) {
        let item = output2[i];
        reminders.push({ 
            "idReminder" : item.idReminder,
            "idUser"  : item.idUser,
            "rTitle"    : item.rTitle ,
            "rDesc"    : item.rDesc ,
            "type"    : item.type, 
            "rDate"    : item.rDate ,
            "rTime"    : item.rTime 
        });
    }
    for(var i in output3) {
        let item = output3[i];
        todos.push({ 
            "idTodo" : item.idTodo,
            "idUser"  : item.idUser,
            "todolistTitle" : item.todolistTitle ,
            "items": item.items
        });
    }
    
    details.notes= notes;
    details.reminders = reminders;
    details.todos=todos;
    return details
}

module.exports = {addUserDetails,loginUser, getUsersDetails, getUserById, updateUserDetails, deleteUserDetails, getAllUserDetails}