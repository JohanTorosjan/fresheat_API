module.exports = app => {
    const auth = require('../middleware/auth');
    const message = require("../controllers/message.controller.js");
    var router = require("express").Router();
    router.post('/post',auth,message.postfriendrequest)
    router.get('/getbyid/:id_cook',auth,message.getMessages)
    app.use('/message',router);
};
    