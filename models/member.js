var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema(
    {
        loginname: { type: String, required: true },
        screenname: { type: String, required: true },
        password: { type: String, required: true },
        membership: {type: String, enum: ['standard', 'plus' ], default: 'standard'}
    }
);

MemberSchema.virtual('name').get(function(){
    return this.screenname;
});

module.exports = mongoose.model('Member', MemberSchema);