module.exports = app => {
    const auth = require('../middleware/auth');
    const names = require("../controllers/names.controller.js");
    var router = require("express").Router();
    router.get('/:id',auth,names.getnames)
    app.use('/names',router);
};
    