const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const uniqueValidator = require('mongoose-unique-validator')
//require('mongoose-long')(mongoose);
const SchemaTypes = mongoose.Schema.Types;


const CategorySchema = mongoose.Schema({
    name: String,
    type:Number
}, {
        timestamps: true
    });
//CategorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', CategorySchema);


