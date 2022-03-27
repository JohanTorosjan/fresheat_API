const Order= require('../models/order.js')

/////////////////////////////////////////////////////////////////
exports.CreateOrder =(req,res) =>{
    if(!req.body.quantity || !req.body.hours){
        res.status(400).send({
            message: "Content can not be empty!"
          });
        return
    }
    Order.createOrder(req.body.id_cook,req.body.id_cust,req.body.id_rec,req.body.quantity,req.body.hours,req.body.price,(err,data) =>{
        if (err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the order."
                }); 
            return;}
        else{
            res.status(200).send({message:"created"})
        }
                
    });
}
/////////////////////////////////////////////////////////////////
// gettOrdersByid_cust
// id_cust: String
// res : 200 No match OR {orders}
//      500 error
exports.getOrdersByid_cust =(req,res)=>{
    console.log(req.params.id_cust)
    Order.getOrdersByid_cust(req.params.id_cust,(err,result) =>{
        if(err){
            console.log(err)
            if(err.message=="nothing"){
                return res.status(200).send({message:"NO match"})
            }
            return res.status(500).send({message:"Error"})
        }
        else{
            console.log(result)
            return res.status(200).send(result);
        }
    });
}
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// gettOrdersByid_cook
// id_cust: String
// res : 200  {orders}
//      404 nothing
//      500 error
exports.getOrdersByid_cook =(req,res) =>{
    Order.getOrdersByid_cook(req.params.id_cook,(err,result) =>{
        if(err){
            console.log(err)
            if(err.message=="nothing"){
                return res.status(404).send({message:"nothing"})
            }
            else{return res.status(500).send(err)}
        }
        else{
            return res.status(200).send(result);
        }

    })
}
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// req: id_ord,yOn String
// res : 500 error
//      200 {status:1}
exports.check =(req,res) =>{
Order.check(req.params.id_ord,req.body.yOn,(err,result) =>{
    if(err){console.log(err); return res.status(500).send(err);}
    else{
        return res.status(200).send(result);
    }
})
}
/////////////////////////////////////////////////////////////////


