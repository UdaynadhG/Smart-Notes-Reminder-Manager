const { addTodolistDetails, getTodolistDetails, getTodolistByIdUser, getOneTodolist, updateTodolistDetails, deleteTodolistDetails }= require("../services/todolistService");

const addTodolist = async(req, res) => {
    const output = await addTodolistDetails(req);
    if(output!=-1){
        res.status(200).json({
            msg : "todolist inserted",
            code: 200
        });
    }else{
        res.status(400).json({
            msg : "error in adding",
            code: 400
        })
    }
}
const getAllTodolists = async(req, res) => {
    try{
        const output= await getTodolistDetails(req,res)
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

const getTodolistsByIdUser = async(req, res) => {
    try{
        const output = await getTodolistByIdUser(req,res)
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
            msg : "no such notes exists"
        })
    }
}

const getTodolist = async(req, res) => {
    try{
        const output = await getOneTodolist(req,res)
        res.status(200).json({
            data : output
        })
    }catch(err){
        res.status(400).json({
            msg : "no such note exists"
        })
    }
}

const updateTodolists = async(req, res) => {
    try{
        const output = await updateTodolistDetails(req, res)
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

const deleteTodolists = async(req, res) => {
    try{
        await deleteTodolistDetails(req, res)
        res.status(200).json({
            msg : "deleted"
        })
    }catch(err){
        res.status(400).json({
            msg : "no such todolist to delete"
        })
    }
}

module.exports = {addTodolist, getAllTodolists,getTodolistsByIdUser, getTodolist, updateTodolists, deleteTodolists}