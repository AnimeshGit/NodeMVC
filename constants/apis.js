"use strict";

module.exports = Object.freeze({

    USER_LOGIN :'/api/user/login',
    USER_VERIFY :'/api/user/verify',
    USER_CREATE : '/api/user/create',
    USER_GET : '/api/user/getUser/:_id',
    CONTACT_ADD : '/api/contact/add',
    CONTACT_DELETE : '/api/contact/delete/:_id',
    CONTACT_BLOCK : '/api/contact/block',
    CONTACT_BLOCK_REMOVE :  '/api/contact/block/remove/:_id',
    GET_BLOCK_CONTACT : '/api/contact/getBlockContacts',
    GET_CONTACT : '/api/contact/getContacts',
    UPDATE_USER : '/api/User/update',
    GET_ALL_USERS : '/api/User/getAllUsers',

    ADMIN_CREATE : '/api/admin/create',
    ADMIN_LOGIN : '/api/admin/login',
    UPDATE_ADMIN : '/api/admin/update'


});