const {AdminUser, validateAdminUser} = require('../../models/admin_users');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const bcrypt = require('bcryptjs');

const add_admin_user = async (req, res) => {
    try {
        // validate the request body
        const {error} = validateAdminUser(req.body); 
        if(error){ return res.status(400).json({code:400, message:error.details[0].message.replace(/\"/g, "")})}
        // check duplication for email
        const existingAdmin = await AdminUser.findOne({email:req.body.email})
        if(existingAdmin){return res.status(400).json({code:400, message:"Admin with same email already exists"})}
        //Create New Admin User
        let adminUser = new AdminUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        })
        const salt = await bcrypt.genSalt(10);
        adminUser.password = await bcrypt.hash(req.body.password, salt);
        adminUser = await adminUser.save();
        res.status(200).json({
            code      : 200,
            message   : 'Admin Add successfully',
            adminUser : adminUser
        });     
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = add_admin_user;