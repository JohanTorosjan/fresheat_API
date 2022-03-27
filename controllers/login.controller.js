const Login = require( '../models/login.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");


/////////////////////////////////////////////////////////////////
// logCook
// req : 
// { pseudo : String ,password : String}
// res : 
// 400: { message: "Not found cooker with pseudo req.body.pseudo"}
// 500: { message: "Error retrieving customer with pseudo  req.body.pseudo }
// 401:  {error:'WRONG PASSWORD'}
// 200: {id: id_cook, token: secret valid token}
exports.logCook =(req, res) =>{
    Login.logCook(req.body.pseudo,req.body.password, (err,data) =>{
        const bytes = CryptoJS.AES.decrypt(req.body.password, "IShallNotPostAnyPasswordsInClear");
        const password  = bytes.toString(CryptoJS.enc.Utf8)
        if(err){
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found cooker with pseudo ${req.body.pseudo}.`
                });
            } 
            else {
                res.status(500).send({
                message: "Error retrieving cooker with pseudo " + req.body.pseudo
                });
            }
        }
        else{
            hash=data.password;
            bcrypt.compare(password,hash.trim())
            .then(valid =>{
                
                if(!valid){return res.status(401).send({error:'WRONG PASSWORD'})}
                else{
                    res.status(200).json(
                        { id:data.id_cook,
                            token: jwt.sign(
                                { id:data.id_cook},
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h' }
                              )      
                        }
                    )
                }
            })
            .catch(error =>console.log(error))
            
        }
    })
};
/////////////////////////////////////////////////////////////////
//loginCust
// req : 
// { email_ : String ,password : String}
// res : 
// 400: { message: "Not found customer with email req.body.email_"}
// 500: { message: "Error retrieving customer with email  req.body.email_ }
// 401:  {error:'WRONG PASSWORD'}
// 200: {id: customerid, token: secret valid token}
exports.logCust = (req,res) =>{
    Login.logCustomer(req.body.email_,(err,data) =>{
        const bytes = CryptoJS.AES.decrypt(req.body.password, "IShallNotPostAnyPasswordsInClear");
        const password  = bytes.toString(CryptoJS.enc.Utf8)
        if(err){
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found customer with pseudo ${req.body.email_}.`
                });
            } 
            else {
                res.status(500).send({
                message: "Error retrieving customer with pseudo " + req.body.email_
                });
            }
        }
        else
        {
                hash=data.password;
                bcrypt.compare(password,hash.trim())
                .then(valid =>{
                    console.log(valid)
                    if(!valid){return res.status(401).send({error:'WRONG PASSWORD'})}
                    else{
                        res.status(200).json(
                            { id:data.id_cust,
                                token: jwt.sign(
                                    { id:data.id_cust},
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                  )      
                            }
                        )
                    }
                })
                .catch(error =>console.log(error))
        }
    })
}




