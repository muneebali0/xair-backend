const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const adminUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
        lowercase: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "manager", "developer"],
        default: "manager",
    },
    image: {

    },
    verification_code: {
        type: String,
        trim: true,
        default: "",
    },
    is_send_code: {
        type: Boolean,
        default: false,
    },
    is_verified_code: {
        type: Boolean,
        default: false,
    },
});

adminUserSchema.plugin(timestamps);

adminUserSchema.methods.toJSON = function() {
    const adminUser = this;
    const adminUserObject = adminUser.toObject();
    const adminUserJson = _.pick(adminUserObject, [
        "_id",
        "name",
        "email",
        "role",
        "image",
        "verification_code",
        "is_send_code",
        "is_verified_code",
    ]);
    return adminUserJson;
};

adminUserSchema.statics.findByEmail = function(email) {
    const admin_user = this;
    return admin_user.findOne({ email: email });
};

function validateAdminUser(adminUser) {
    const schema = {
        name: Joi.string().min(5).max(25).required().trim(),
        email: Joi.string().required().email().trim(),
        password: Joi.string().min(5).max(25).required().trim(),
        role: Joi.string().valid("admin", "developer", "manager").required().trim(),
        image: Joi.string().trim(),
        verification_code: Joi.string().trim(),
        is_send_code: Joi.boolean(),
        is_verified_code: Joi.boolean(),
    };
    return Joi.validate(adminUser, schema);
}

function validateEditAdminUser(adminUser) {
    const schema = {
        name: Joi.string().min(5).max(25).required().trim(),
    };
    return Joi.validate(adminUser, schema);
}

function validateAdminUserLogin(adminUser) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(adminUser, schema);
}

function validatechangepassword(adminUser) {
    const schema = {
        old_password: Joi.string().min(5).max(255).required(),
        new_password: Joi.string().min(5).max(255).required(),
        confirm_password: Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(adminUser, schema);
}

function validateemailforforgotpassword(memberUser) {
    const schema = {
        email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
    };
    return Joi.validate(memberUser, schema);
}

function validateverificationcodeUser(verificationcodeUser) {
    const schema = {
        email: Joi.string().required().trim(),
        verification_code: Joi.string().required().trim(),
    };
    return Joi.validate(verificationcodeUser, schema);
}

function validateemailpasswordforforgotpassword(memberUser) {
    const schema = {
        email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
        password: Joi.string().min(5).max(25).required().trim(),
        confirm_password: Joi.string().min(5).max(25).required().trim(),
    };
    return Joi.validate(memberUser, schema);
}

const adminUser = mongoose.model("adminUser", adminUserSchema);
exports.AdminUser = adminUser;
exports.validateAdminUser = validateAdminUser;
exports.validateEditAdminUser = validateEditAdminUser;
exports.validateAdminUserLogin = validateAdminUserLogin;
exports.validatechangepassword = validatechangepassword;
exports.validateemailforforgotpassword = validateemailforforgotpassword;
exports.validateverificationcodeUser = validateverificationcodeUser;
exports.validateemailpasswordforforgotpassword =
    validateemailpasswordforforgotpassword;