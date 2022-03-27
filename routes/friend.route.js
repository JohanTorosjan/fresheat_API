module.exports = app => {
    const auth = require('../middleware/auth');
    const friend = require("../controllers/friend.controller.js");
    var router = require("express").Router();
    router.put('/accept/:id_cook',auth,friend.accept)
    router.delete('/reject',auth,friend.reject)
    app.use('/demands',router);
};
    