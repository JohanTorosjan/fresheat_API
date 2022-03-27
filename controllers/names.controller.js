const Names=require('../models/names.js')

/////////////////////////////////////////////////////////////////
//getnames
//req.params: id:String
//res
//500: {message:error}
//200:  
//[{id_rec: String, name: String, description: String, sector: String, id_cook: String}]
// OR
// {message: "NO MATCH"}
exports.getnames =(req,res) =>{ 
    Names.getnames(req.params.id,(err,result) =>{
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