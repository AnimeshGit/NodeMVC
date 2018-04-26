"use strict";

var express = require('express');
var router = express.Router();
var adminController = require('../../controllers/admin/adminController.js');

router.post(APIS.ADMIN_CREATE, adminController.createAdmin);

router.post(APIS.ADMIN_LOGIN, adminController.loginAdmin);

router.post(APIS.UPDATE_ADMIN, adminController.updateAdmin);

module.exports = router;
