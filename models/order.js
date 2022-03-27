const sql = require("./db.js");

class Order{
    constructor(order){}
    /////////////////////////////////////////////////////////////////
    // Func createOrder
    // id_cook,id_cust,id_rec,hours: String, quantity: Int ->
    // (err:sql.error, result:NULL)
    // OR
    // (err: NULL,{message: "created"})
    static createOrder(id_cook,id_cust,id_rec,quantity,hours,price,result){
        sql.query(`INSERT INTO orders (IsValidated, quantity, hours, id_cook, id_cust, id_rec,prices) VALUES ('0', '${quantity}', '${hours}', '${id_cook}', '${id_cust}', '${id_rec}','${price}')`, (err,res) =>{
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              console.log("created order: ", { res });
              result(null, { message: "created" });

        });
    }

    /////////////////////////////////////////////////////////////////
    // Func getOrdersByid_cust
    // id_cust:String ->
    // (err: sql.error, result: null)
    // OR
    // (err:null, reult : [{}])
    // (err:{message: "nothing"}, err: null)
    static getOrdersByid_cust(id_cust,result){
        sql.query(`SELECT * FROM orders o JOIN cooker c ON o.id_cook=c.id_cook JOIN receipe r ON r.id_rec=o.id_rec WHERE o.id_cust=${sql.escape(id_cust)} ORDER BY id_ord;`,(err,res) =>{
            if(err){
                console.log(err);
                result(err,null);
                return
            }
            if(res.length){
                result(null,res)
                console.log(res)
                return;
            }
            result({message:"nothing"},null)
            return;
        })
    }
    

    static getOrdersByid_cook(id_cook,result){
        sql.query(`SELECT id_ord,c.pseudo,c.id_cust,quantity,prices,sector,isValidated,name,hours FROM orders o JOIN customer c ON o.id_cust=c.id_cust JOIN receipe r ON r.id_rec=o.id_rec WHERE o.id_cook=${sql.escape(id_cook)} ORDER BY id_ord;`,(err,res) =>{
            if(err){console.log(err);return result(err,null);}
            else {
                if(res.length){
                return result(null,res);}
                else{ return result({message:"nothing"},null)}
                
            }
        });
    }
    static check(id_ord,yOn,result){
        sql.query(`UPDATE orders SET IsValidated =${sql.escape(yOn)} WHERE orders.id_ord =${sql.escape(id_ord)};`,(err,res) =>{
            if(err){return result(err,null)}
            else{
                return result(null,{status:1})
            }
        });
    }
}
module.exports = Order;