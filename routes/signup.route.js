module.exports = app => {
    const signup = require("../controllers/signup.controller.js");
    var router = require("express").Router();

    router.post('/cooker',signup.createCooker)
    router.post('/customer',signup.createCustomer)
    app.use('/signup', router);
    /*
    router.post("/", customer.create);
    router.post("/login",customer.TryAuth)
    router.get("/:email", customer.findOne);
    app.use('/api/customer', router);
    */
  };  