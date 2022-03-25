const Customer = require( '../models/Customer.model.js')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken');


// function decrypt (src) {
//   const passphrase = 'BLABLABLA'
//   const bytes = CryptoJS.AES.decrypt(src, passphrase)
//    const originalText = bytes.toString(CryptoJS.enc.Utf8)
//   return originalText
//  }


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a customer
    const customer = new Customer({
      id_cust: req.body.id_cust,
      email_: req.body.email_,
      pseudo: req.body.pseudo,
      password: req.body.password
    });
    // Save customer in the database
    Customer.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the customer."
        });
      else res.send(data);
    });
  };


  exports.findOne = (req, res) => {
    Customer.findByEmail(req.params.email, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found customer with email ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving customer with email " + req.params.email
          });
        }
      } else res.send(data);
    });
  };

  exports.TryAuth = (req,res) =>{
    Customer.TryAuth(req.body.email_,req.body.password, (err,data) =>{if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found customer with email ${req.body.email_}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving customer with email " + req.body.email_
        });
      }
    } else 
    res.status(200).send({
      token: jwt.sign(
        { email_: req.body.email_ },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
      )
    });
  })
};