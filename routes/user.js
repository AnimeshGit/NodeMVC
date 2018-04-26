"use strict";

var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');


router.post(APIS.USER_LOGIN, userController.loginUser);

router.post(APIS.USER_VERIFY, userController.verifyUserEmail);

router.post(APIS.USER_CREATE, userController.createUser);

router.post(APIS.UPDATE_USER, userController.updateUser);
// router.get('/user/getall', userController.getAllUsers);
// router.get('/user/delete/:_id', userController.deleteUser);
router.get(APIS.USER_GET, userController.getUserById);

router.get(APIS.GET_ALL_USERS, userController.getAllUsers);


module.exports = router;
