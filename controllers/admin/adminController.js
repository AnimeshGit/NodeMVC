"use strict";

// Internal dependencies
var adminService = require('../../services/admin/adminService.js');
var bcrypt = require('bcrypt');

function createAdmin(req, res) {
    try {
        let input = req.body;
        var salt = bcrypt.genSaltSync(10);
        var hash_password = bcrypt.hashSync(input.adminPassword, salt);
        input['adminPassword'] = hash_password;
        adminService.createAdmin(input,
            function (successData) {
                let body = "Hi ";
                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
            })
    } catch (error) {
        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function loginAdmin(req,res) {
    try {
        let input = req.body;
        adminService.loginAdmin(input,
            function (successData) {
                res.send(successData);
            }, function (errorData) {
                res.send(errorData);
        });
    } catch (error) {
        res.send(RESPONSE.sendResponse(null, null, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

function updateAdmin(req, res) {
    try {
        var reqBody = req.body
        userService.updateAdmin(reqBody, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        });
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}

exports.createAdmin = createAdmin;
exports.updateAdmin = updateAdmin;
exports.loginAdmin = loginAdmin;
