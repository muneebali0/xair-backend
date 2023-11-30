const {AdminUser, validatechangepassword} = require('../../models/admin_users');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 

const admin_change_password = async (req, res) => {
     
    try {
        let user_password = "";
        let password      = "";

        //validate login Request Body
        const {error} = validatechangepassword(req.body) 
        if(error){ return res.status(400).json({code:400, message:error.details[0].message.replace(/\"/g, "")})}
        
        //check Admin User Exist against it's id
        let adminUser = await AdminUser.findById(req.user._id)
        if(!adminUser){return res.status(400).json({code:400, message:"Admin user not exist"})}
        

        //check confirm password or password  match
        if(req.body.new_password !== req.body.confirm_password){
            return res.status(400).json({code:400, message:"Password should be match with confirm password"})
        }
         
        // Match Password and database password
        const validPassword = await bcrypt.compare(req.body.old_password, adminUser.password);
        if(!validPassword){return res.status(400).json({code:400, message: "Old password not match."})};

        //saving password
        user_password = req.body.new_password;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(user_password, salt);
        adminUser.password = password;
        adminUser = await adminUser.save();
        
        //saving data
        res.status(200).json({
            code    : 200,
            message : 'Admin password updated successfully',
            member  : adminUser
        });     
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = admin_change_password;