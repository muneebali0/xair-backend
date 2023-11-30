const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

var slug = require("mongoose-slug-plugin");

var options = {
  tmpl: "<%=title%>",
  unique: true,
  slugField: "plan_slug",
  slugOptions: { lower: true },
};

const paymentPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  plan_slug: {
    type: String,
    trim: true,
    slug: "title",
    unique: true,
  },
  type: {
    type: String,
    trim: true,
  },

  status: {
    type: Boolean,
    default: true,
  },
  plan_price: {
    type: Number,
    default: 0,
  },
  short_description: {
    type: String,
    trim: true,
  },
  detailed_description: {
    type: String,
    trim: true,
  },
  button_title: {
    type: String,
    default: "",
  },
  // no_of_installments: {
  //   type: Number,
  //   default: 0,
  // },
  recursion_type: {
    type: String,
    default: "",
  },
});

paymentPlanSchema.plugin(timestamps);
paymentPlanSchema.plugin(slug, options);

paymentPlanSchema.methods.toJSON = function () {
  const memberUser = this;
  const memberUserObject = memberUser.toObject();
  const paymentPlanJson = _.pick(memberUserObject, [
    "_id",
    "title",
    "type",
    "plan_price",
    "short_description",
    "detailed_description",
    "button_title",
    // "no_of_installments",
    "status",
    "recursion_type",
    "createdAt",
    "updatedAt",
  ]);
  return paymentPlanJson;
};

function validatePaymentPlan(paymentPlan) {
  const schema = {
    title: Joi.string().required().trim(),
    type: Joi.string().required().trim(),
    status: Joi.boolean().required(),
    plan_price: Joi.number().allow(null, ""),
    short_description: Joi.string().allow(null, "").trim(),
    detailed_description: Joi.string().allow(null, "").trim(),
    button_title: Joi.string().allow(null, "").trim(),
    // no_of_installments: Joi.number().allow(null, ""),
    recursion_type: Joi.string().allow(null, "").trim(),
  };
  return Joi.validate(paymentPlan, schema);
}

function validateEditPaymentPlan(paymentPlan) {
  const schema = {
    title: Joi.string().required().trim(),
    type: Joi.string().required().trim(),
    status: Joi.boolean().required(),
    plan_price: Joi.number().allow(null, ""),
    short_description: Joi.string().allow(null, "").trim(),
    detailed_description: Joi.string().allow(null, "").trim(),
    button_title: Joi.string().allow(null, "").trim(),
    // no_of_installments: Joi.number().allow(null, ""),
    recursion_type: Joi.string().allow(null, "").trim(),
  };
  return Joi.validate(paymentPlan, schema);
}

const PaymentPlan = mongoose.model("PaymentPlan", paymentPlanSchema);
exports.PaymentPlan = PaymentPlan;
exports.validatePaymentPlan = validatePaymentPlan;
exports.validateEditPaymentPlan = validateEditPaymentPlan;
