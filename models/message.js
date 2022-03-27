const sql=require("./db.js");

class Message{
    constructor(message){
    }
    /////////////////////////////////////////////////////////////////
    static getiftheyrfriends(id_cook,id_cust,result){
        sql.query(`SELECT * FROM isfriend where id_cust=${sql.escape(id_cust)} AND id_cook=${sql.escape(id_cook)};`,(err,res)=>{
            if(err){
            console.log(err);
            return result({status:0});                
            }
            else{
                if(res.length){
                    return result({status:1})
                }
                else{return result(null)}
            }
        });
    }
    /////////////////////////////////////////////////////////////////
    
/////////////////////////////////////////////////////////////////
//Func postfriendrequest
//id_cook,id_cust,message: String ->
//(err:error, result: NULL)
//OR
//(err: NULL, result: {message: "created"})
    static postfriendrequest(id_cook,id_cust,message,result){
        this.getiftheyrfriends(id_cook,id_cust, (err) =>{
            if(err){
                if(err.status==0){
                    return result(err,null);
                }
                if(err.status==1){
                    return result({message:"You are already friends"},null)
                }
            }
            else{
                sql.query(`INSERT INTO askfriend (id_cust,id_cook,message) VALUES(${sql.escape(id_cust)},${sql.escape(id_cook)},${sql.escape(message)});`, (err,res) =>{
                    if (err) {
                        if(err.errno==1062){
                            return result({message:"already asked this cooker"},null);
                        }
        
                        console.log("fucking error: ", err);
                        result(err, null);
                        return;
                      }
                      console.log("created friend request: ", { res });
                      return result(null, { message: "created" });           
                });
            }
            

        });
    }

    static getMessages(id_cook,result){
        sql.query(`SELECT a.id_cust, pseudo,message FROM askfriend a JOIN customer c ON a.id_cust=c.id_cust WHERE id_cook=${sql.escape(id_cook)};`,(err,res) => {

            if(err){
                console.log(err);
                return result(err,null);
            }
            else{
                console.log(res);
                return result(null,res);
            }

        });
    }
    

}

module.exports=Message;
