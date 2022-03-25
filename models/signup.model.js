const signupRoute = require("../routes/signup.route.js");
const sql = require("./db.js");

const Signup = function(signup) {
  this.datas=signup.datas;
};

Signup.createCooker = (pseudo,password, result) => {
    sql.query(`INSERT INTO cooker (pseudo,password) VALUES("${pseudo}","${password}")`,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created cooker: ", {res});
      result(null, {datas: res});
    });
  };

  Signup.createCustomer = (email_,pseudo,password, result) => {
    sql.query(`INSERT INTO customer (email_,pseudo,password) VALUES("${email_}","${pseudo}","${password}")`,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created customer: ", {res});
      result(null, { datas: res});
    });
  };



  module.exports = Signup;

