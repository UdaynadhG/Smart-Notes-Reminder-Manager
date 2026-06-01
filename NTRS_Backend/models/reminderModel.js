const mongoose = require('mongoose')
const Schema= mongoose.Schema,
    autoIncrement= require('mongoose-auto-increment');
var connection= mongoose.createConnection(
    "mongodb+srv://Shivanii:Database@123@trail.simt2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&keepAlive=true&autoReconnect=true",
    // "mongodb://localhost/imagesInMongoDB",
    {useNewUrlParser : true, useMongoClient: true}

)
autoIncrement.initialize(connection);

const reminderSchema = new Schema({
    idUser: String,
    rTitle: String,
    rDesc: String,
    type: String,
    rDate: String,
    rTime: String,
    flag: Boolean,
    scheduleId: String
    // time :  
    // { type : Date, default: Date.now }         //use to update time

})

reminderSchema.set('timestamps', true); // this will add createdAt and updatedAt timestamps
reminderSchema.plugin(autoIncrement.plugin,{model: 'reminder', field: 'idReminder', startAt: 100});
const reminder = connection.model('reminder', reminderSchema)
// const student = mongoose.model("img", studentSchema)
module.exports = reminder