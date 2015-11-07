module.exports = function authenticated(req, res, next) {
    var token = null;
    if(!req.isSocket) {
        token = req.headers.authorization || false;
    }
    else {
        token = req.param("token");
    }
    console.log(token);
    if(!token){
        return res.json(401,{err: "user should be authenticated 1"} )
    }
    JwtHandler.verify(token, function(err, payload){
       User.findOne({token:token}, function(err,user){
        if(err) 
            return res.json(401, {err: "user should be authenticated 2"})
        if(!user) 
            return res.json(401, {err: "user should be authenticated 3"})
        req.user = user;
        req.token = token;
        next();
        }) 
    })
    
}