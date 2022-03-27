const sql = require("./db.js");
/////////////////////////////////////////////////////////////////
class Friend{
    constructor(friends){}
    /////////////////////////////////////////////////////////////////
    static accept(id_cook,id_cust,result){
        sql.query(`INSERT INTO isfriend (id_cust, id_cook) VALUES (${sql.escape(id_cust)},${sql.escape(id_cook)});`,(err,res) =>{
            if(err){
                console.log(err);
                return result(err,null)
            }
        else{
            sql.query(`DELETE FROM askfriend WHERE askfriend.id_cust = ${sql.escape(id_cust)} AND askfriend.id_cook = ${sql.escape(id_cook)};`,(err,res) =>{
                if(err){
                    console.log(err);
                    return result(err,null);}
                else{
                    return  result(null,{message:"created"})
                }
            });
        }
        });
    }
    /////////////////////////////////////////////////////////////////
    static reject(id_cook,id_cust,result){
        sql.query(`DELETE FROM askfriend WHERE askfriend.id_cust = ${sql.escape(id_cust)} AND askfriend.id_cook = ${sql.escape(id_cook)};`,(err,res) =>{
            if(err){console.log(err);return result(err,null)}
            else{
                return result(null,{message:"deleted"})
            }
        });
    }
    /////////////////////////////////////////////////////////////////
}
module.exports=Friend;