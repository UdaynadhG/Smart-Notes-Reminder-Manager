const notes = require("../models/noteModel")
const fs = require('fs');
const jwt=require('jsonwebtoken')

const addNoteDetails = async(req, res) => {
    
    
    // var imageBase64=fs.readFileSync(req.files.noteImg[0].path,'base64');
    // var docBase64=fs.readFileSync(req.files.noteFile[0].path,'base64')

    const n1= new notes({
        idUser : req.body.idUser,
        noteTitle : req.body.noteTitle,
        noteDesc : req.body.noteDesc,
        // noteImg: {
            // data: fs.readFileSync(req.files.image[0].path),
            // contentType: req.file.mimetype
        // },
        // noteFile: {
            // data: fs.readFileSync(req.files.document[0].path),
            // contentType: req.file.mimetype
        // }
        // noteImg: null,
        // noteFile: null
    })

    await n1.save().then((result) => {
        return result;
    }).catch((err) => {
            return -1;
    })
}

const getNoteDetails = async(req, res) => {
    try{
        const output = await notes.find()
        res.status(200).json({ data : output})
    }
    catch(error){
        res.status(400).json({ data : output, msg : "error"})
        console.log("error")
        throw error
    }
}

const getNoteByIdUser = async (req, res) => {
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
    var output = await notes.find({idUser : id1})
    return output
}

const getOneNote= async (req, res) => {d
    const id1= req.params.idNote;
    var output = await notes.findOne({idNote : id1})
    return output
}

const updateNoteDetails = async (req, res) => {
    console.log("in update")
    const id1 = req.params.idNote;
    // console.log("in update")
    // console.log("id here "+id1)
    // console.log("in update img "+req.files.noteImg[0])
    // console.log("in update other "+req.files.noteFile[0])
    
    // var imageBase64=fs.readFileSync(req.files.noteImg[0].path,'base64');
    // var docBase64=fs.readFileSync(req.files.noteFile[0].path,'base64')
    var notes1= {
        $set : {
            idUser : req.body.idUser,
            noteTitle : req.body.noteTitle,
            noteDesc : req.body.noteDesc,
            // noteImg: imageBase64,
            // noteFile: docBase64
        }
    };
    await notes.updateOne({ idNote : id1}, notes1, function(err, res){
        if(err) throw err;
            // console.log("not updated")
        return notes1;
    })

}
const deleteNoteDetails = async(req, res) => {
    const id1 = req.params.idNote
    var output = await notes.deleteOne({idNote : id1}, function(err, res){
        if(err) throw err;
        console.log("deleted")
    })
}

module.exports = {addNoteDetails, getNoteDetails, getNoteByIdUser, getOneNote, updateNoteDetails, deleteNoteDetails} 