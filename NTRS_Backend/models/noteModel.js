const mongoose = require('mongoose')
const Schema= mongoose.Schema,
    autoIncrement= require('mongoose-auto-increment');
var connection= mongoose.createConnection(
    "mongodb+srv://Shivanii:Database@123@trail.simt2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&keepAlive=true&autoReconnect=true",
    // "mongodb://localhost/imagesInMongoDB",
    {useNewUrlParser : true}
)
autoIncrement.initialize(connection);

const noteSchema = new Schema({
    idUser: String,
    noteTitle: String,
    noteDesc: String,
    // noteImg:{
    //     // data: Buffer,
    //     // contentType: String,
    //     type: String
    // },
    // noteFile:{
    //     // data: Buffer,
    //     // contentType: String,
    //     type: String
    // }
    

})

noteSchema.set('timestamps', true); // this will add createdAt and updatedAt timestamps
noteSchema.plugin(autoIncrement.plugin,{model: 'note', field: 'idNote', startAt: 100});
const note = connection.model("note", noteSchema)
// const student = mongoose.model("img", studentSchema)
module.exports = note