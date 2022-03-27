module.exports = app =>{
    const auth = require('../middleware/auth');
    const switchbutton=require("../controllers/switchbutton.controller.js")
    var router = require("express").Router();
    router.get('/:id_cook',auth,switchbutton.getstatut);
    router.put('/change/:id_cook',auth,switchbutton.switchstatut)
    app.use('/statut',router);
};