const {
  PaymentPlan,
  validatePaymentPlan,
} = require("../../models/payment_plan");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const add_plan = async (req, res) => {
  try {
    // validate the request body
    const { error } = validatePaymentPlan(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    // "title",
    // "type",
    // "initial_amount",
    // "installment_amount",
    // "plan_price",
    // "status",

    let plan_obj = {
      title: req.body.title,
      type: req.body.type,
      plan_price: req.body.plan_price,
      status: req.body.status,
      short_description: req.body.short_description,
      detailed_description: req.body.detailed_description,
      button_title: req.body.button_title,
      recursion_type: req.body.recursion_type,
    };

    let plan = new PaymentPlan(plan_obj);

    plan = await plan.save();
    res.status(200).json({
      code: 200,
      message: "Added successfully",
      plan: plan,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_plan;
