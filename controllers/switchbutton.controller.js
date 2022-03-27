const Switchbutton=require('../models/switchbutton.js')

/////////////////////////////////////////////////////////////////
// getstatus
// req: id_cook: String
// res: 500 err
//      200 {statut: bool}
exports.getstatut =(req,res) =>{
    Switchbutton.getstatut(req.params.id_cook,(err,result) =>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send({statut:result.isonline});
        }
    });
}
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// req: params: id_ccok:String, body: isOnline: Bool
// res 500 err
//  201 {message:created}
exports.switchstatut =(req,res) =>{
    console.log(req.body.isonline);
    Switchbutton.switchstatut(req.params.id_cook,req.body.isonline,(err,result)=>{
        if(err){return res.status(500).send(err)}
        else{
            return res.status(201).send(result);
        }

    });
}
/////////////////////////////////////////////////////////////////
