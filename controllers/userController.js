"use strict";

// Internal dependencies
var userService = require('../services/userServices.js');
var bcrypt = require('bcrypt');


function createUser(req, res) {

    try {
        
        let input = req.body;
        var salt = bcrypt.genSaltSync(10);
        // Hash the password with the salt
        var hash_password = bcrypt.hashSync(input.password, salt);
        input['password'] = hash_password;

        input['verifyCode'] = Math.floor(Math.random()*90000) + 10000;

        userService.createUser(input,
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


function loginUser(req,res) {
    try {
        let input = req.body;
        userService.loginUser(input,
            function (successData) {

                //let body = "Hi ";
                //Utility.sendEmail("no-reply@addressit.com",input.contact[0].eMail,"Email Verification",body);

                res.send(successData);

            }, function (errorData) {

                res.send(errorData);
        });
    } catch (error) {
        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }

}

function verifyUserEmail(req,res) {
    try {
        let input = req.body;
        userService.verifyUser(input,
            function (successData) {
                //let body = "Hi ";
                //Utility.sendEmail("no-reply@addressit.com",input.contact[0].eMail,"Email Verification",body);

                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
        });
    }catch (error) {
        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function updateUser(req, res) {
    try {

        var reqBody = req.body
        userService.updateUser(reqBody, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        });

    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}


//get all users
function getAllUsers(req, res) {

    try {
        userService.getAllUsers(req,function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        });
    } catch (error) {
        
        res.send(RESPONSE.internalServerError(error.message));
    }
}

// delete user
function deleteUser(req, res) {
    try {
        userService.deleteUser(req.params._id,
            function (successData) {
                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
            });
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}

// get single user
function getUserById(req, res) {
    try {
        userService.getUserById(req.params._id,
            function (successData) {
                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
            });
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}

exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getAllUsers = getAllUsers;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.loginUser = loginUser;
exports.verifyUserEmail = verifyUserEmail;