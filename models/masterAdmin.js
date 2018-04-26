"use strict";

var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;

// set up a mongoose model
var masterAdmin = new Schema({
    adminFirstName: {
        type: String,
        required: true
    },
    adminLastName: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    }
});

module.exports.masterAdmin = mongoose.model('masterAdmin', masterAdmin, 'masterAdmin');