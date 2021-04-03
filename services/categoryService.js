const mongoose = require('mongoose');
const Category = require('../models/category');
const Enum = require('enum');
const myEnum = new Enum({'QuestionType1': 1, 'QuestionType2': 2});
function create(categoryType){
    return new Promise(function(resolve,reject){
        Category.findOne({type:categoryType}).then(function(category ){
            if(category==null){
                var tempCategory = new Category({type:categoryType,name:myEnum.get(categoryType).key});
                tempCategory.save().then(function(saved){
                    resolve(saved);
                }).catch(function(err2){
                    reject(err2);
                });
            }else{
                resolve(category);
            }
        }).catch(function(err){
            reject(err);
        });
    });   
}
module.exports = {
    create
}