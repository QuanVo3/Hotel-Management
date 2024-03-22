const jwt = require('jsonwebtoken');

const middleware = {
    verifyToken: (req,res,next) =>{
        const token = req.header.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.authKey,(err,user)=> {
                if(err){

                    res.status(404).json("Token is not valid");
                }
                req.user = user;
                next();
            });

        }
        else{
            res.status(404).json("you are not authenticated");
        }
    }
}

module.exports = middleware;