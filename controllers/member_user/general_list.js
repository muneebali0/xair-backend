const { MemberUser } = require("../../models/member_user");
const { BloodGroup } = require("../../models/blood_group");
const { Address } = require("../../models/address");
const { Profession } = require("../../models/profession");
const { Education } = require("../../models/education");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const add_member = async (req, res) => {
  try {
    
    let blood_group_list = await BloodGroup.find({}).sort({ group_name: 1 });
    let address_list = await Address.find({}).sort({ address: 1 });
    let profession_list = await Profession.find({}).sort({ title: 1 });
    let education_list = await Education.find({}).sort({ title: 1 });
 
    res.status(200).json({
      code: 200,
      message: "List",
      blood_group_list,
        address_list,
        profession_list,
        education_list
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_member;
