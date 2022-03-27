const Message=require('../models/message.js')

/////////////////////////////////////////////////////////////////
// postfriendrequest
// req: id_cook, id_cust, msg: String
//res: 409 message:"You already asked this cooker,wait until he responds you" OR message:"You are already friends"
//     401 message:"Problem during posting the friend request"
//     200 message:"Your demand has been sent ! "
exports.postfriendrequest = (req,res) =>{
    Message.postfriendrequest(req.body.id_cook,req.body.id_cust,req.body.msg,(err,result) => {
        if(err){
            console.log(err);
            if(err.message=="already asked this cooker"){
                return res.status(409).send({message:"You already asked this cooker,wait until he responds you"})
            }
            if(err.message=="You are already friends"){
                return res.status(409).send({message:"You are already friends"})
            }
            return res.status(401).send({message:"Problem during posting the friend request"})
        }
        else{
            console.log(result)
            return res.status(200).send({message:"Your demand has been sent ! "})
        }
    });
}
/////////////////////////////////////////////////////////////////
// getMessages
// req: id_cook: String
// res: 500 err
//      200 {message}
exports.getMessages =(req,res) =>{
    Message.getMessages(req.params.id_cook,(err,result) =>{
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(result);
        }
    });
}
/////////////////////////////////////////////////////////////////