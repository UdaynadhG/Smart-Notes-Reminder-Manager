const { addUserDetails,loginUser, getUsersDetails, getUserById, updateUserDetails, deleteUserDetails, getAllUserDetails}= require('../services/userService')

const addUser = async(req, res) => {
    const output = await addUserDetails(req);
    if(output!=-1){
        res.status(200).json({
            msg : "user inserted",
            code: 200
        });
    }else{
        res.status(400).json({
            msg : "error in adding",
            code: 400
        })
    }
}

const login = async(req,res) => {
    const output= await loginUser(req);
    req.body.idUser=req.body.phone;
    console.log("id "+req.body.idUser);
    const output1= await getAllUserDetails(req,res)
    console.log("after ");
    if(output==-1){
        res.status(400).json({
            msg: "Invalid Password",
            code: 401
        })
    }
    else if(output==-2){
        res.status(400).json({
            msg: "Invalid User",
            code: 402
        })
    }
    else{
        res.status(200).json({
            data: output1,
            token: output,
            msg: "Logged in ",
            code: 200
        })
    }
}

const getUsers = async(req, res) => {
    try{
        const output= await getUsersDetails(req,res)
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

const getOneUser = async(req, res) => {
    try{
        const output = await getUserById(req,res)
        res.status(200).json({
            data : output
        })
    }catch(err){
        res.status(400).json({
            msg : "no such user exists"
        })
    }
}

const updateUser = async(req, res) => {
    console.log("in controller update")
    try{
        const output = await updateUserDetails(req, res)
        res.status(200).json({
            data : output,
            msg : "updated"
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            msg : "no such user to update"
        })
    }
}

const deleteUser = async(req, res) => {
    try{
        await deleteUserDetails(req, res)
        res.status(200).json({
            msg : "deleted"
        })
    }catch(err){
        res.status(400).json({
            msg : "no such user to delete"
        })
    }
}

const getUserDetailsTotal = async(req, res) => {
    try{
        const output = await getAllUserDetails(req,res)
        res.status(200).json({
            data : output
        })
    }catch(err){
        res.status(400).json({
            msg : "no such user exists"
        })
    }
}

module.exports = {addUser,login, getUsers, getOneUser, updateUser, deleteUser, getUserDetailsTotal}
