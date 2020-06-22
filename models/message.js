var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        title: {type:String, required: true, min:1},
        message: {type:String, required:true, min:1},
        dateadded: {type:Date,required:true},
        author: {type: Schema.Types.ObjectId, ref: 'Member', required:true},
    }
);

module.exports = mongoose.model('Message', MessageSchema);