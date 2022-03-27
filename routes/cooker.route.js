module.exports = app => {
    const auth = require('../middleware/auth');
    const cooker = require("../controllers/cooker.controller.js");
    var router = require("express").Router();
    router.get('/getbypseudo/:pseudo',auth,cooker.getcookerbypseudo)
    app.use('/cooker',router);
};
    