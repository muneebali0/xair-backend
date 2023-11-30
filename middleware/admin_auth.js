const admin_auth = (req, res, next) => {
    
    if(req.user.login_by === "admin_user"){
        next();
    }
    else{
        res.status(401).json({
            code: 401,
            message: 'Access denied ....'
        });
    }
    
};

module.exports = {admin_auth};
