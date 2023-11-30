const {
  PaymentPlan,
  validateEditPaymentPlan,
} = require("../../models/payment_plan");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const add_plan = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateEditPaymentPlan(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    let plan = await PaymentPlan.findOne({ _id: req.params.plan_id });
    if (!plan) {
      return res.status(400).json({
        code: 400,
        message: "Plan not found",
      });
    }

    plan.title = req.body.title;
    plan.type = req.body.type;
    plan.plan_price = req.body.plan_price;
    plan.status = req.body.status;
    plan.short_description = req.body.short_description;
    plan.detailed_description = req.body.detailed_description;
    plan.button_title = req.body.button_title;
    plan.recursion_type = req.body.recursion_type;

    plan = await plan.save();
    res.status(200).json({
      code: 200,
      message: "Updated successfully",
      plan: plan,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_plan;
