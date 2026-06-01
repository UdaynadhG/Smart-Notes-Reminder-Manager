const todolist = require("../models/todolistModel")
const jwt=require('jsonwebtoken')

const addTodolistDetails = async(req, res) => {
    // const item= new items({
    //     idItem: req.body.idItem,
    //     idDesc: req.body.idDesc
    // })

    const t1= new todolist({
        idUser : req.body.idUser,
        todolistTitle : req.body.todolistTitle,
        items: req.body.items
    })

    await t1.save().then((result) => {
        return result;
    }).catch((err) => {
            return -1;
    })
}
const getTodolistDetails = async(req, res) => {
    try{
        const output = await todolist.find()
        res.status(200).json({ data : output})
    }
    catch(error){
        res.status(400).json({ data : output, msg : "error"})
        console.log("error")
        throw error
    }
}

const getTodolistByIdUser = async (req, res) => {
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
    var output = await todolist.find({idUser : id1})
    return output
}

const getOneTodolist= async (req, res) => {
    const id1= req.params.idTodo;
    var output = await todolist.findOne({idTodo : id1})
    return output
}

const updateTodolistDetails = async (req, res) => {
    console.log("in update")
    const id1 = req.params.idTodo;
    // console.log("in update")
    // console.log("id here "+id1)
    console.log("in update idUser "+req.body.idUser)
    var todo= {
        $set : {
            idUser : req.body.idUser,
            todolistTitle : req.body.todolistTitle,
            items: req.body.items
        }
    };
    await todolist.updateOne({ idTodo : id1}, todo, function(err, res){
        if(err) throw err;
            // console.log("not updated")
        return todo;
    })

}
const deleteTodolistDetails = async(req, res) => {
    const id1 = req.params.idTodo
    var output = await todolist.deleteOne({idTodo : id1}, function(err, res){
        if(err) throw err;
        console.log("deleted")
    })
}

module.exports = {addTodolistDetails, getTodolistDetails, getTodolistByIdUser, getOneTodolist, updateTodolistDetails, deleteTodolistDetails} 