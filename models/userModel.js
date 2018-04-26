"use strict";

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var user = new Schema({
    userTitle: { type:String, required:true},
    userName : { type:String, required:true, unique : true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type:String, required:true},
    birthDay: { type: Number, required: true },
    birthMonth: { type: Number, required: true },
    birthYear: { type: Number, required: false },
    verifyCode: String,

    contact:[
        {
            eMail:String,
            phoneNumber:Number,
            phoneType:{ type: String , required: false }
           
        }
    ],

    address:[
        {
            streetAddress:String,
            detailAddress:String,
            city:String,
            state:String,
            zipCode:Number
        }
    ],
    spouse : [
        {
            spouseTitle:{type:String,required:false},
            spousefName:{type:String,required:false},
            spouselName:{type:String,required:false},
            spouseEmail:{type:String,required:false},
            spouseNumber:{type:Number,required:false},
            spousePhoneType:{type:String,required:false},
            spousebDay:{type:String,required:false},
            spousebMonth:{type:String,required:false},
            spousebYear:{type:String,required:false},
            spouseAnnDay:{type:String,required:false},
            spouseAnnMonth:{type:String,required:false},
            spouseAnnYear:{type:String,required:false}
        }
    ],
    kids : [
        {
            kidfName:String,
            kidlName:String,
            kidmName:String,
            kidbDay:Number,
            kidbMonth:Number,
            kidbYear:Number
        }
    ],
    pets: [
        {
            petName:String,
            petType:String
        }
    ]   

})


// Exports modules.
module.exports.user = mongoose.model('user', user, 'user');