"use strict";

//External dependencies
var express = require('express');
var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
const Sequelize = require('sequelize');
const _ = require('underscore');
const email = require('emailjs/email');

//Declear global variables
if (!global._) {
    global._ = _;
}
if (!global.MESSAGE)
    global.MESSAGE = require('./constants/messages.js');

if (!global.STATUS_CODE)
    global.STATUS_CODE = require('./constants/statusCode.js');

if (!global.RESPONSE)
    global.RESPONSE = require('./helpers/Response.js');

if (!global.Utility)
    global.Utility = require('./helpers/Utility.js');

if (!global.KEYS)
    global.KEYS = require('./constants/keys.js');

if (!global.APIS)
    global.APIS = require('./constants/apis.js');


if (!global.EMAILSERVER) {
    global.EMAILSERVER = email.server.connect({
        user:    KEYS.EMAILUSER, 
        password:KEYS.EMAILPASSWORD, 
        host:    KEYS.EMAILHOST, 
        ssl:     true
     });
}


//Internal dependencies
var userRoutes = require('./routes/user.js');
var contactRoutes = require('./routes/contact.js');

var adminRoutes = require('./routes/admin/userAdmin.js');

var config = require('./config/config.js');
var db = require('./config/databaseConnection.js');

var envConfig = config.environmentConfig();
var port = envConfig.port;
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '5mb', extended: true }));
// parse application/json
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

//parse multipart/form-data    
app.use(busboyBodyParser());

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        next();
    });
    

app.get('/*', function (req, res, next) {
    console.log(req.method, "->", req.headers.host)
    next();
});

// Initialize routes
app.all('*', userRoutes);
app.all('*', contactRoutes);
app.all('*', adminRoutes);

var server = app.listen(process.env.PORT || port, function () {
    console.log('server runnig on port:', port);
    db.connectToMongo();
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.send(RESPONSE.sendResponse(false, false, null, err, STATUS_CODE.INTERNAL_SERVER_ERROR))
});

module.exports = app;

