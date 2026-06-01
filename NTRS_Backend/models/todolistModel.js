const mongoose = require('mongoose')
const Schema= mongoose.Schema,
    autoIncrement= require('mongoose-auto-increment');
var connection= mongoose.createConnection(
    "mongodb+srv://Shivanii:Database@123@trail.simt2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&keepAlive=true&autoReconnect=true",
    // "mongodb://localhost/imagesInMongoDB",
    {useNewUrlParser : true}
)
autoIncrement.initialize(connection);

const itemSchema= new Schema({
    idItem: String,
    idDesc: String,
    flag: Boolean
})
// const items=mongoose.model('items',itemSchema);

const todolistSchema = new Schema({
    idUser: String,
    todolistTitle: String,
    items:[itemSchema]
    // items: [{
    //     idItem: String,
    //     idDesc: String
    // }]

})

todolistSchema.set('timestamps', true); // this will add createdAt and updatedAt timestamps
todolistSchema.plugin(autoIncrement.plugin,{model: 'todolist', field: 'idTodo', startAt: 100});

const todolist = connection.model("todolist", todolistSchema)
// const student = mongoose.model("img", studentSchema)
module.exports = todolist