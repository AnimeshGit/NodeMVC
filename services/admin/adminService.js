"use strict";

var adminModel = require('../../models/masterAdmin.js').masterAdmin;
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var secret = 'TOPSECRETTTTT';

//create user
function createAdmin(data, successData, errorData) {
    try {        
        adminModel(data).save().
            then(function (result) {
                successData(RESPONSE.sendResponse(true, true, result, MESSAGE.SUCCESS, STATUS_CODE.OK));
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR))
            })
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function loginAdmin(data, successData, errorData) {
    try {       
        adminModel.findOne({ adminEmail: data.adminEmail }, 'adminEmail adminPassword', function (err, result) {
            if (err) 
                return handleError(err);
            if(result) {
                if (bcrypt.compareSync(data.adminPassword, result.adminPassword)) {
                    
                    var token = jwt.sign({
                        data: result
                    }, secret, { expiresIn: 60 * 60 });

                    let res = JSON.parse(JSON.stringify(result));
                    res['token'] = token;

                    successData(RESPONSE.sendResponse(true, true, res, MESSAGE.LOGINSUCCESS, STATUS_CODE.OK));
                } else {
                    errorData(RESPONSE.sendResponse(null, null, null, MESSAGE.PASSERROR, STATUS_CODE.OK));
                }
            } else {
                errorData(RESPONSE.sendResponse(null, null, null, MESSAGE.USERERROR, STATUS_CODE.INTERNAL_SERVER_ERROR));
            }
        });
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}


//update user
function updateAdmin(data, successData, errorData) {
    try {
        adminModel.findOneAndUpdate({ _id: data._id }, { $set: data }, { new: true })
            .then(function (result) {
                if (result) {
                    successData(RESPONSE.sendResponse(true, true, result, MESSAGE.UPDATE_DATA, STATUS_CODE.OK));
                } else {
                    successData(RESPONSE.sendResponse(true, false, null, MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND));
                }
            }).catch(function (error) {
                errorData(RESPONSE.sendResponse(false, false, null, error.message, STATUS_CODE.BAD_REQUEST));
            });
    } catch (error) {
        errorData(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}



module.exports.createAdmin = createAdmin;
module.exports.updateAdmin = updateAdmin;
module.exports.loginAdmin = loginAdmin;
