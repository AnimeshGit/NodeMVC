"use strict";

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

var blockContact = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userBlocktId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: { type: String, required: true },
    createdOn : {type:Date,default: Date.now}
    
})


// Exports modules.
module.exports.blockContact = mongoose.model('blockContact', blockContact, 'blockContact');