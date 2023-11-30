const { PaymentPlan } = require("../../models/payment_plan");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const get_plans = async (req, res) => {
  try {
    let payment_plans = await PaymentPlan.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      code: 200,
      message: "Plans List",
      payment_plans: payment_plans,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = get_plans;
