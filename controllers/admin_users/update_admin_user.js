const {AdminUser, validateUpdateAdminProfile} = require('../../models/admin_users');
const {RENDER_BAD_REQUEST} = require('../common/utils');

const update_admin_user = async (req, res) => {
    try {
        // validate the request body
        const {error} = validateUpdateAdminProfile(req.body); 
        if(error){ return res.status(400).json({code:400, message:error.details[0].message.replace(/\"/g, "")})}
        // check duplication for email
        const existingAdmin = await AdminUser.findOne({_id:{$ne:req.user._id}, email:req.body.email})
        if(existingAdmin){return res.status(400).json({code:400, message:"Admin with same email already exists"})}
        //Update Admin User
        req.customer.email = req.body.email;
        await req.customer.save();
        
        res.status(200).json({
            code      : 200,
            message   : 'Admin Profile Update successfully',
            adminUser : req.customer
        });     
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = update_admin_user;