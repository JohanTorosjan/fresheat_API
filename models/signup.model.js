const sql = require("./db.js");

//Abstract class to decompose functions
class Signup {
  constructor(signup) {}

/////////////////////////////////////////////////////////////////
//Func createCooker
//msg,pseudo,password: String ->
//(err:error, result: NULL)
//OR
//(err: NULL, result: {message: "created"})

  static createCooker(msg, pseudo, password, result) {
      sql.query(`INSERT INTO cooker (pseudo,password,isAvailable) VALUES(${sql.escape(pseudo)},${sql.escape(password)},"FALSE")`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created cooker: ", { res });
        result(null, { message: "created" });
      });
  }


/////////////////////////////////////////////////////////////////
// createCustomer
//email_,pseudo,password: String ->
//(err:error, result: NULL)
// OR
//(err:NULL, result: {message: created})

  static createCustomer(email_, pseudo, password, result) {
    sql.query(`INSERT INTO customer (email_,pseudo,password) VALUES(${sql.escape(email_)},${sql.escape(pseudo)},${sql.escape(password)})`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created customer: ", { res });
      result(null, { message: "create" });
    });
  }
}
/////////////////////////////////////////////////////////////////





module.exports = Signup;

