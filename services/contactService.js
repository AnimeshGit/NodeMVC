"use strict";

var contactModel = require('../models/contactModel.js').contact;
var blockModel = require('../models/blockModel.js').blockContact;
var bcrypt = require('bcrypt');

//create user
function addContact(data, successData, errorData) {
    try {        
        contactModel(data).save().
            then(function (result) {
                successData(RESPONSE.sendResponse(true, true, result, MESSAGE.SUCCESS, STATUS_CODE.OK));
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
            })
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function blockContact(data, successData, errorData) {
    try {        
        blockModel(data).save().
            then(function (result) {
                successData(RESPONSE.sendResponse(true, true, result, MESSAGE.SUCCESS, STATUS_CODE.OK));
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
            })
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

//delete contact
function deleteContact(id, successData, errorData) {
    try {
        contactModel.findById(id)
            .then(function (result) {
                if (result) {
                    try {
                        contactModel.remove({ _id: id })
                            .then(function (result) {
                                successData(RESPONSE.sendResponse(true, true, null, MESSAGE.CONTACT_DELETED_SUCCESS, STATUS_CODE.OK));
                            }).catch(function (error) {
                                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
                            });
                    } catch (error) {
                        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
                    }
                } else {
                    successData(RESPONSE.sendResponse(true, false, null, MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND));
                }
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
            })
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

//delete contact
function removeBlock(id, successData, errorData) {
    try {
        blockModel.findById(id)
            .then(function (result) {
                if (result) {
                    try {
                        blockModel.remove({ _id: id })
                            .then(function (result) {
                                successData(RESPONSE.sendResponse(true, true, null, MESSAGE.BLOCK_DELETED_SUCCESS, STATUS_CODE.OK));
                            }).catch(function (error) {
                                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
                            });
                    } catch (error) {
                        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
                    }
                } else {
                    successData(RESPONSE.sendResponse(true, false, null, MESSAGE.CONTACT_NOT_FOUND, STATUS_CODE.NOT_FOUND));
                }
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
            })
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function getBlockedContacts(data,successData,errorData) {
    try {
        blockModel.find(data, function(err, result) 
        {
            if (err)
            {
                errorData(RESPONSE.sendResponse(null, null, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR));
            }
          
            if (result.length > 0) {
                successData(RESPONSE.sendResponse(true, true, result, MESSAGE.SUCCESS, STATUS_CODE.OK));
            } else {
                successData(RESPONSE.sendResponse(true, false, null, MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND));
            }
       
        });
    
    }
    catch (error)
    {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function getContacts(data,successData,errorData) {
    try {
        contactModel.find(data).populate('userId').exec( function(err, result) 
        {
            if (err)
            {
                errorData(RESPONSE.sendResponse(null, null, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR));
            }
          
            if (result) {
                successData(RESPONSE.sendResponse(true, true, result, MESSAGE.SUCCESS, STATUS_CODE.OK));
            } else {
                successData(RESPONSE.sendResponse(true, false, null, MESSAGE.CONTACT_NOT_FOUND, STATUS_CODE.NOT_FOUND));
            }
       
        });
    
    }
    catch (error)
    {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

module.exports.addContact = addContact;
module.exports.deleteContact = deleteContact;
module.exports.blockContact = blockContact;
module.exports.removeBlock = removeBlock;
exports.getBlockedContacts = getBlockedContacts;
exports.getContacts = getContacts;
