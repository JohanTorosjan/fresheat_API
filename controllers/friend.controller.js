const Friend = require('../models/friend.js')



//accept:
//req: id_cook,id_cust:String
//res: 500 Error
//     200 {message:Created} 
/////////////////////////////////////////////////////////////////////////
exports.accept = (req,res) =>{
    Friend.accept(req.params.id_cook,req.body.id_cust,(err,result) =>{
        if(err){
            console.log(err)
            return res.status(500).send(err);
        }
        else{
            console.log(req)
            return res.status(200).send(result);
        }

    });
}
//////////////////////////////////////////////////////////////////////////

//reject
//req: id_cook, id_cust:String
//res: 500 Error
//     200 {message: deleted} 
exports.reject =(req,res) =>{
    Friend.reject(req.body.id_cook,req.body.id_cust,(err,resultat) =>{
        if(err){console.log(err);return res.status(500).send(err);}
        else{
            return res.status(200).send(resultat);
        }
    });
}
/////////////////////////////////////////////////////////////////