const Receipe=require('../models/receipe.js')

/////////////////////////////////////////////////////////////////
// getreceipe
//req.params: id:String
//res
//500: {message:error}
//200:  
//{id_rec: String, name: String, description: String, price: Number, ic_cook: String}
//OR
//{message:"NO match"}
exports.getReceipe =(req,res,next) =>{
    Receipe.getCookReceipe(req.params.id_cook,(err,result) =>{
        if(err){
            console.log(err)
            if(err.message=="nothing"){
                 res.status(200).send({message:"NO match"}); next();return;
            }
             res.status(500).send({message:"Error"}); next();return;
        }
        else{
            console.log(res);
            res.status(200).send(result);next();return;
        }
    });
}
/////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////
// deletereceipe
// req: id_rec String
// res: 500 error
//      200 {status 1}
exports.deletereceipe =(req,res) =>{
    Receipe.deleteReceipe(req.params.id_rec,(err,result) =>{
        if(err){return res.status(500).send(err)}
        else{
            return res.status(200).send(result)
        }
    });
}
/////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////
// addreceipe
// req: id_rec String
// res: 500 error
//      200 {status 1}
exports.addreceipe =(req,res) =>{
    Receipe.addReceipe(req.params.id_cook,req.body.name,req.body.description,req.body.sector,req.body.price,(err,result)=>{
        if(err){console.log(err);return res.status(500).send(err);}
        else{
            return res.status(200).send(result);
        }       
    });
}
/////////////////////////////////////////////////////////////////
