var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        title: {type:String, required: true, min:1},
        message: {type:String, required:true, min:1},
        dateadded: {type:Date,required:true}
    }
);

module.exports = mongoose.model('Message', MessageSchema);