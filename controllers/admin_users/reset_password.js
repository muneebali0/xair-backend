const {AdminUser,validateemailpasswordforforgotpassword} = require('../../models/admin_users');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const bcrypt = require('bcryptjs');

const reset_password = async (req, res) => {
    try {
         
        // validate the request body
        const {error} =validateemailpasswordforforgotpassword(req.body); 
        if(error){ return res.status(400).json({code:400, message:error.details[0].message.replace(/\"/g, "")})}

        //check Member User Exist against this email
        let Adminuser = await AdminUser.findOne({email:req.body.email})
        if(!Adminuser){return res.status(400).json({code:400, message:"Invalid email address"})}

        //checking code process is verified
        if(Adminuser.is_verified_code==true){
            if(Adminuser.is_send_code==true){
                return res.status(400).json({code:400, message:"Verify your verification code"})
            }
            else{
                //getting and hashing password
                let user_password = req.body.password;
                let confirm_password = req.body.confirm_password;
                if(user_password===confirm_password){
                    const salt = await bcrypt.genSalt(10);
                    let password = await bcrypt.hash(user_password, salt);
    
                    //saving data
                    Adminuser.password = password;
                    Adminuser.is_verified_code=false; 
                    Adminuser.verification_code="";
                    Adminuser = await Adminuser.save(); 
                    res.status(200).json({
                        code    : 200,
                        message : 'Password Reset Sucessfully',
                        admin   : Adminuser
                    });

                }
                else{
                    return res.status(400).json({code:400, message:"Password should match with confirm password"})
                }
                
            }
        }
        else{
            return res.status(400).json({code:400, message:"Contact Customer Care to get verifcation code"})
        }    
    }
     catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = reset_password;