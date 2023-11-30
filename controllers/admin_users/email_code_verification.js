const {AdminUser, validateverificationcodeUser} = require('../../models/admin_users');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const bcrypt = require('bcryptjs');

const email_code_verification = async (req, res) => {
    try {
        // validate the request body
        const {error} =validateverificationcodeUser(req.body); 
        if(error){ return res.status(400).json({code:400, message:error.details[0].message.replace(/\"/g, "")})}
         
        //validate email
        let Adminuser = await AdminUser.findOne({email:req.body.email})
        if(!Adminuser){return res.status(400).json({code:400, message:"Invalid email or verification code"})}  

        //checking is_verified_status
        if(Adminuser.is_send_code==true){ 

            //checking verification code
            if(Adminuser.verification_code===req.body.verification_code){ 
                Adminuser.is_send_code     =false; 
                Adminuser.is_verified_code =true;
                Adminuser = await Adminuser.save(); 
                res.status(200).json({
                    code      : 200,
                    message   : 'verification code matched' 
                });
            }
            else{
                return res.status(400).json({code:400, message:"Verification code not matched"})
            }
        }
        else{
            return res.status(400).json({code:400, message:"invalid verification code"})
        }
    } 
    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = email_code_verification;