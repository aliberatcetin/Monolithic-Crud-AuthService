const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const uniqueValidator = require('mongoose-unique-validator')
//require('mongoose-long')(mongoose);
const SchemaTypes = mongoose.Schema.Types;


const QuestionSchema = mongoose.Schema({
    typeName:String,
    username:String,
    user :{type:ObjectId,ref:'user'},
    email:String,
    text:String,
    category: { type: ObjectId, ref: 'category'},
    isActive:{type:Boolean,default:true},
    answer:{type:String,default:null},
    fileCode:{type:String,default:null}
}, {
        timestamps: true
    });
QuestionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Question', QuestionSchema);


