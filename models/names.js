const sql = require("./db.js");



class Names{
    constructor(names){ }
/////////////////////////////////////////////////////////////////
    // Func GetNames
    //
    // id: String -> 
    //(err: sql.error, result: NULL)
    //OR
    //(err:NULL, result: [ {id_cook: String,pseudo: String}]
    // OR
    //(err:result: {message: "nothing"},NULL)
    static getnames(id, result){
        sql.query(`SELECT c.id_cook,c.pseudo,c.isAvailable FROM cooker c JOIN isfriend f ON c.id_cook=f.id_cook JOIN customer cu ON f.id_cust=cu.id_cust WHERE cu.id_cust=${sql.escape(id)}`,(err,res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
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
}

module.exports= Names;