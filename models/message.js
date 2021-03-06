var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        title: {type:String, required: true, min:1},
        message: {type:String, required:true, min:1},
        dateadded: {type:String,required:true},
        author: {type: Schema.Types.ObjectId, ref: 'Member', required:true},
    }
);


MessageSchema.virtual('url').get(function () {
    return '/message/' + this._id;
});


module.exports = mongoose.model('Message', MessageSchema);