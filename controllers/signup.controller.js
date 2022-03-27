const signup = require( '../models/signup.model.js')
const bcrypt = require('bcrypt')
var CryptoJS = require("crypto-js");
//------------------------------------------------------------------------------------
//Func createCooker

//req:
//{msg:String, pseudo:String, password:String}

//res
//400: {message: "Content can not be empty"}
//      {message: "INVALID SECRET CODE"}
//500:  {message:err.message || "Some error occurred while creating the cooker." }
// 200 {message: create}

exports.createCooker = (req, res) => {
    if (!req.body.msg ||!req.body.pseudo || !req.body.password ) {
      res.status(400).send({
        message: "Content can not be empty!"
      })
      return
    }
    if(req.body.msg!="SecretCode"){
      res.status(200).send({
        message:"INVALID SECRET CODE"
      })
      return
    }
    // Save cooker in the database
    const bytes = CryptoJS.AES.decrypt(req.body.password, "IShallNotPostAnyPasswordsInClear");
    const password  = bytes.toString(CryptoJS.enc.Utf8)
    bcrypt.hash(password.trim(),10).then((hash) => {
      signup.createCooker(req.body.msg,req.body.pseudo,hash, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the cooker."
            });
          else res.status(200).send({message:"created"});
      })
    })
    .catch(error => console.log(error));
  };


//------------------------------------------------------------------------------------

//Func createCustomer

// req:
// {email_ String, pseudo: String, password: String}

// res:
// 400 : { message: "Content can not be empty"}
// 500 : { message: err.message || Some error occurred while creating the customer. }
// 200 : {message: "created"}

exports.createCustomer = (req, res) => {
    if (!req.body.email_ || !req.body.password || !req.body.pseudo) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return
    }
    // Save customer in the database
    const bytes = CryptoJS.AES.decrypt(req.body.password, "IShallNotPostAnyPasswordsInClear");
    const password  = bytes.toString(CryptoJS.enc.Utf8)
    bcrypt.hash(password.trim(),10).then(hash =>{
      signup.createCustomer(req.body.email_,req.body.pseudo,hash,(err, data) => {
        if (err){
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the customer."
          });
          return}
        else res.status(200).send({message:"created"});
      })
      })
    .catch(error => console.log(error));
  };

