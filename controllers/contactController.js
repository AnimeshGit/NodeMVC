"use strict";

// Internal dependencies
var contactService = require('../services/contactService.js');
var bcrypt = require('bcrypt');


function addContact(req, res) {
    try {
        let input = req.body;
        
        contactService.addContact(input,
            function (successData) {
                let body = "Hi ";
                //Utility.sendEmail("no-reply@addressit.com",input.contact[0].eMail,"Email Verification",body);
                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
            })
    } catch (error) {

        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function blockContact(req,res) {
    try {
        let input = req.body;

        contactService.blockContact(input,
            function(successData) {
                res.send(successData);
            },
            function(errorData) {
                res.send(errorData);
            }
        );
    } catch (error) {

        res.send(RESPONSE.sendResponse(null,null,null,error.message,STATUS_CODES.INTERNAL_SERVER_ERROR));
    }
}


function deleteContact(req, res) {
    try {

        contactService.deleteContact(req.params._id,
            function (successData) {
                let body = "Hi ";
                //Utility.sendEmail("no-reply@addressit.com",input.contact[0].eMail,"Email Verification",body);

                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
            })
    } catch (error) {
        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function removeBlock(req, res) {
    try {
        contactService.removeBlock(req.params._id,
            function (successData) {
                let body = "Hi ";
                //Utility.sendEmail("no-reply@addressit.com",input.contact[0].eMail,"Email Verification",body);
                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
            })
    } catch (error) {
        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function getBlockedContacts(req,res) {
    let input = req.body;
    try {
        contactService.getBlockedContacts(input,
            function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        });
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}

function getContacts(req,res) {
    let input = req.body;
    try {
        contactService.getContacts(input,
            function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        });
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}

exports.addContact = addContact;
exports.deleteContact = deleteContact;
exports.blockContact = blockContact;
exports.removeBlock = removeBlock;
exports.getBlockedContacts = getBlockedContacts;
exports.getContacts = getContacts;