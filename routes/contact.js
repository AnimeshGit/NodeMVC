"use strict";

var express = require('express');
var router = express.Router();
var contactController = require('../controllers/contactController.js');


router.post(APIS.CONTACT_ADD, contactController.addContact);

router.get(APIS.CONTACT_DELETE, contactController.deleteContact);

router.post(APIS.CONTACT_BLOCK,contactController.blockContact);

router.get(APIS.CONTACT_BLOCK_REMOVE,contactController.removeBlock);

router.post(APIS.GET_BLOCK_CONTACT,contactController.getBlockedContacts);

router.post(APIS.GET_CONTACT,contactController.getContacts);


module.exports = router;
