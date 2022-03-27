const sql = require("./db.js");

class Receipe{
    constructor(receipe){}
    /////////////////////////////////////////////////////////////////
    // getCookReceipe
    // id: String -> 
    //(err: sql.error, result: NULL)
    //OR
    //(err: null, result: {id_rec: String, name: String, description: String, price: Number, ic_cook: String})
    // OR
    //(err: {message: "nothing"},result: NULL)
    static getCookReceipe(id_cook,result){
        sql.query(`SELECT * FROM receipe WHERE id_cook=${sql.escape(id_cook)}`,(err,res)=>{
            if(err){
                console.log("error:",err)
                result(err,null);
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
    /////////////////////////////////////////////////////////////////
    static deleteReceipe(id_rec,result){
        sql.query(`UPDATE receipe SET isActive = 'FALSE' WHERE receipe.id_rec =${sql.escape(id_rec)};`,(err,res) =>{
            if(err){console.log(err);return result(err,null);}
            else{
                return result(null,{status:1})
            }
        });
    }
    ////////////////////////////////////////////////////////////////
    static addReceipe(id_cook,name,description,sector,price,result){
        sql.query(`INSERT INTO receipe (id_rec, name, description, sector, price, isActive, id_cook) VALUES (NULL,${sql.escape(name)},${sql.escape(description)},${sql.escape(sector)},${sql.escape(price)}, 'TRUE',${sql.escape(id_cook)});`,(err,res) =>{

                if(err){console.log(err);return result(err,null)}
                else{
                    return result(null,{status:1})
                }
        });
    } 
}

module.exports=Receipe;