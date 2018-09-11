var {user}  =require('./../models/user');

var authenticate = (req, res, next)=>{
    var token  = req.header('x-auth');


    user.findByToken(token).then((User)=>{
        if(!User){
            // res.status(401).send();
            return Promise.reject();
        }
        //happy path
        // res.send(User);
        req.User = User;
        req.token = token;
        next();
    }).catch((err)=>{
          res.status(401).send();
    });
};

module.exports = {authenticate};