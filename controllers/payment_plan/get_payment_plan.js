const { PaymentPlan } = require("../../models/payment_plan");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const get_plans = async (req, res) => {
  try {
    let payment_plan = await PaymentPlan.findOne({ _id: req.params.plan_id });

    if (!payment_plan) {
      return res.status(400).json({
        code: 400,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      code: 200,
      message: "Plan Detail",
      payment_plan: payment_plan,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = get_plans;
