const sql = require('./db.js')

class Cooker{
    constructur(cooker){}
    //--------------------------------------------------------
    // Func getcookerbypseudo
    //
    // id: String -> 
    //(err: sql.error, result: NULL)
    //OR
    //(err:NULL, result:  {cooker}
    // OR
    //(err:result: {message: "nothing"},NULL)
    static getcookerbypseudo(pseudo,result){
        console.log(pseudo)
        sql.query(`SELECT * FROM cooker where pseudo=${sql.escape(pseudo)}`,(err,res) =>{
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              if(res.length){
                result(null,res[0])
                console.log(res)
                return;
            }
            result({message:"nothing"},null)
            return;
        });
    }



}
module.exports=Cooker;