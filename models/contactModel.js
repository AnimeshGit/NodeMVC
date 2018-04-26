"use strict";

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var contact = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    userContactId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    status: { type: String, required: true },
    createdOn : {type:Date,default: Date.now}
    
})


// Exports modules.
module.exports.contact = mongoose.model('contact', contact, 'contact');