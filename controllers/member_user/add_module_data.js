const { BloodGroup } = require("../../models/blood_group");
const { Address } = require("../../models/address");
const { Profession } = require("../../models/profession");
const { Education } = require("../../models/education");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const add_module = async (req, res) => {
  try {
    
    let module_type = req.query.module_type;
    let module_obj = {};
    if( module_type == 'blood_group' ){
         module_obj = new BloodGroup(req.body);
    }else if( module_type == 'address' ){
        module_obj = new Address(req.body);
    }else if( module_type == 'profession' ){
        module_obj = new Profession(req.body);
    }else if( module_type == 'education' ){
        module_obj = new Education(req.body);
    }

    await module_obj.save();

    res.status(200).json({
      code: 200,
      message: "Added Successfully",
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_module;
