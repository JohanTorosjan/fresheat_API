const sql = require("./db.js");
class Switchbutton{
    constructor(switchbutton){}
/////////////////////////////////////////////////////////////////
    static getstatut(id_cook,result){
        sql.query(`SELECT isAvailable FROM cooker WHERE id_cook=${sql.escape(id_cook)};`,(err,res) =>{
            if(err){
                console.log("error",err);
                result(err,null);
                return;
            }
            else{  
                if(res[0].isAvailable=="FALSE")return result(null,{isonline:0});
                if(res[0].isAvailable=="TRUE")return result(null,{isonline:1});
                result(null,res.isAvailable);return;
            }
        });
    }
/////////////////////////////////////////////////////////////////
    static switchstatut(id_cook,isonline,result){
    if(isonline==1){
        sql.query(`UPDATE cooker SET isAvailable = 'FALSE' WHERE cooker.id_cook =${sql.escape(id_cook)};`,(err,res) => {
            if(err){return result(err,null);}
                else{return result(null,res);}
            });
    }
    if(isonline==0){
        sql.query(`UPDATE cooker SET isAvailable = 'TRUE' WHERE cooker.id_cook =${sql.escape(id_cook)};`,(err,res) => {
            if(err){return result(err,null);}
            else{return result(null,res);}
        });
    }
}
/////////////////////////////////////////////////////////////////

}

module.exports=Switchbutton;