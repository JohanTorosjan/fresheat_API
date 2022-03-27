const sql = require("./db.js");

//Abstract class to decompose functions 
class Login {
  constructor(login) {}

  ///////////////////////////////////////////////////////////////// 
  //logCook :
  // email_ : String -> 
  // (err: error , result: null) 
  // OR  
  // (err: null, result: {id_cook:String,pseudo:String, password: hash}) 
  // OR
  // (result {kind: "not found"},err: null)
  static logCook(pseudo, password, result) {
    sql.query(`SELECT * FROM cooker WHERE pseudo=${sql.escape(pseudo)}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found cooker: ", res[0]);
        result(null,res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
      return;
    });
  }

/////////////////////////////////////////////////////////////////
  //logCustomer :
  // email_ : String -> 
  // (err: error , result: null) 
  // OR  
  // (err: null, result: {id_cust:String,email_:String  pseudo: String, password: hash}) 
  // OR
  // (result {kind: "not found"},err: null)
  static logCustomer(email,result){
    sql.query(`SELECT * FROM customer WHERE email_=${sql.escape(email)}`,(err,res)=>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null,res[0]);
        return;
      }
      console.log(res)
      result({ kind: "not_found" }, null);
      return;
    })
  }
}

module.exports= Login;