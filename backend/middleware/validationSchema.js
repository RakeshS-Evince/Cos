const Joi = require("joi");
const ApiError = require("../utils/apiError");
const { StatusCodes } = require("http-status-codes");

const registerSchema = (req, res, next) => {
    const schema = Joi.object({
        fullname: Joi.string().min(5).max(30).required(),
        username: Joi.string().min(5).max(30).required(),
        email: Joi.string().email().required(),
        contact: Joi.string().min(10).max(13).pattern(new RegExp("^\\d{3}[ -]?\\d{3}[ -]?\\d{4}$")).optional(),
        password: Joi.string()
            .pattern(
                new RegExp(
                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                )
            )
            .required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    });
    const { error } = schema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        next(error);
        return
    }
    next()

};
const loginSchema = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        next(error);
        return
    }
    next();
};
const forgotPasswordSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required(),
    });
    const { error } = schema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        res.status(StatusCodes.BAD_REQUEST).send({ message: error.details[0].message });
        return;
    }
    next();
};
const resetPasswordSchema = (req, res, next) => {
    const schema = Joi.object({
        newPassword: Joi.string()
            .pattern(
                new RegExp(
                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                )
            )
            .required(),
        confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
    });
    const { error } = schema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        res.status(StatusCodes.BAD_REQUEST).send({ message: error.details[0].message });
        return;
    }
    next();
};
const staffUpadateSchema = async (req, res, next) => {
    const schema = Joi.object({
        fullname: Joi.string().min(5).max(30).allow(null, ""),
        username: Joi.string().min(5).max(30).allow(null, ""),
        email: Joi.string().email().allow(null, ""),
        contact: Joi.string().min(10).max(13).pattern(new RegExp("^\\d{3}[ -]?\\d{3}[ -]?\\d{4}$")).allow(null, ""),
    });
    const { error } = schema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        next(error);
        return
    }
    next()
}

const addressSchema = async (req, res, next) => {
    const schema = Joi.object({
        firstname: Joi.string().min(5).max(30).required(),
        lastname: Joi.string().min(5).max(30).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(10).max(13).pattern(new RegExp("^\\d{3}[ -]?\\d{3}[ -]?\\d{4}$")).required(),
        address: Joi.string().min(5).max(30).required(),
        state: Joi.string().min(5).max(30).required(),
        city: Joi.string().min(5).max(30).required(),
        zip: Joi.string().pattern(new RegExp("^\\d{3}[ -]?\\d{3}[ -]?\\d{4}$")).required().required(),
    });
    const { error } = schema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        next(error);
        return
    }
    next()
}

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    staffUpadateSchema,
    addressSchema
}