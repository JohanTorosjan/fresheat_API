module.exports = app =>{
    const auth = require('../middleware/auth.js')
    const order =require('../controllers/order.controller')
    var router = require("express").Router();
    router.post('/Create',auth,order.CreateOrder)
    router.get('/getbyid/:id_cust',auth,order.getOrdersByid_cust)
    router.get('/getbyid/cook/:id_cook',auth,order.getOrdersByid_cook)
    router.put('/check/:id_ord',auth,order.check)
    app.use('/order',router)
};