module.exports = app =>{
    const auth = require('../middleware/auth');
    const receipes=require("../controllers/receipes.controller.js")
    var router = require("express").Router();
    router.get('/:id_cook',auth,receipes.getReceipe)
    router.delete('/delete/:id_rec',auth,receipes.deletereceipe)
    router.put('/add/:id_cook',auth,receipes.addreceipe)
    app.use('/receipe',router);
};