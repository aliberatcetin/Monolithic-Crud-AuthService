const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
//var uniqueValidator = require('mongoose-unique-validator');
const SchemaTypes = mongoose.Schema.Types;


const UserSchema = mongoose.Schema({
    fullname:String,
    email : String,
    token : {type:String,default:null},
    password:String,
    authority:{type:Boolean,default:false},
    push_token:{type:String,default:null}
}, {
        timestamps: true
    });
//TourSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);


