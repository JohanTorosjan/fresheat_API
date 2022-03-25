const sql = require("./db.js");

// const CryptoJS = require('crypto-js')

const Customer = function(customer) {
    this.id_cust=customer.id_cust;
    this.email_ = customer.email_;
    this.pseudo = customer.pseudo;
    this.password = customer.password;
  };


  // function decrypt (src) {
  //   const passphrase = 'BLABLABLA'
  //   const bytes = CryptoJS.AES.decrypt(src, passphrase)
  //    const originalText = bytes.toString(CryptoJS.enc.Utf8)
  //   return originalText
  //  }

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created customer: ", { id: res.id, ...newCustomer });
      result(null, { id: res.id, ...newCustomer });
    });
  };

  Customer.findByEmail = (email_, result) => {
    sql.query(`SELECT * FROM customer WHERE email_ =${email_}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found customer with the email
      result({ kind: "not_found" }, null);
    });
  };

  Customer.TryAuth = (email_, password,result) =>{
    sql.query(`SELECT * FROM customer WHERE email_="${email_}" AND password="${password}"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found customer: ", res[0]);
        // res[0].password=decrypt(res[0].password);
        result(null, res[0]);
        return;
      }
            // not found customer with the email and password
      result({ kind: "not_found" }, null);
      return;
  });
  };
  module.exports = Customer;

