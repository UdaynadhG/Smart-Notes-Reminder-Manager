const { addNoteDetails, getNoteDetails,getNoteByIdUser, getOneNote, updateNoteDetails, deleteNoteDetails }= require("../services/noteService");

const addNotes = async(req, res) => {
    const output = await addNoteDetails(req);
    if(output!=-1){
        res.status(200).json({
            msg : "notes inserted",
            code: 200
        });
    }else{
        res.status(400).json({
            msg : "error in adding",
            code: 400
        })
    }
}
const getAllNotes = async(req, res) => {
    try{
        const output= await getNoteDetails(req,res)
        res.status(200).json({
            data : output
        })
    }
    catch(err){
        res.status(400)
        // res.json(err)
        return
    }
}

const getNotesByIdUser = async(req, res) => {
    try{
        const output = await getNoteByIdUser(req,res)
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
        console.log("eda "+err);
        res.status(400).json({
            msg : "no such notes exists",
            status: 400
        })
    }
}

const getNote = async(req, res) => {
    try{
        const output = await getOneNote(req,res)
        res.status(200).json({
            data : output
        })
    }catch(err){
        res.status(400).json({
            msg : "no such note exists"
        })
    }
}

const updateNotes = async(req, res) => {
    try{
        const output = await updateNoteDetails(req, res)
        res.status(200).json({
            data : output,
            msg : "updated"
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            msg : "no such notes to update"
        })
    }
}

const deleteNotes = async(req, res) => {
    try{
        await deleteNoteDetails(req, res)
        res.status(200).json({
            msg : "deleted"
        })
    }catch(err){
        res.status(400).json({
            msg : "no such notes to delete"
        })
    }
}

module.exports = {addNotes, getAllNotes,getNotesByIdUser, getNote, updateNotes, deleteNotes}