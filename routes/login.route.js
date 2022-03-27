module.exports = app => {
    const Login = require("../controllers/login.controller.js");
    var router = require("express").Router();
    router.post('/cooker',Login.logCook)
    router.post('/customer',Login.logCust)
    app.use('/login',router);

};
    