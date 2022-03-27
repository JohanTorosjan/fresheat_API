const Cooker = require('../models/cooker.js')


//getcookerbypseydo : 
//req pseudo:String 
//res : 500 Error
//      200 No Match or {cooker}

//////////////////////////////////////////////////////////////////////////////////
exports.getcookerbypseudo =(req,res) =>{
    Cooker.getcookerbypseudo(req.params.pseudo,(err,result) =>{
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
////////////////////////////////////////////////////////////////////////////////////////