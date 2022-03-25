const signup = require( '../models/signup.model.js')
const jwt = require('jsonwebtoken');


exports.createCooker = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Save cooker in the database
    signup.createCooker(req.body.pseudo,req.body.password, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the customer."
        });
      else res.send(data);
    });
  };

  exports.createCustomer = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Save customer in the database
    signup.createCustomer(req.body.email_,req.body.pseudo,req.body.password, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the customer."
        });
      else res.send(data);
    });
  };

