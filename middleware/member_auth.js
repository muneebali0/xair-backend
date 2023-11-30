const member_auth = (req, res, next) => {
    
    if(req.user.login_by === "member_user"){
        next();
    }
    else{
        res.status(401).json({
            code: 401,
            message: 'Access denied ....'
        });
    }
    
};

module.exports = {member_auth};
