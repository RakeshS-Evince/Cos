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
            .required()
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

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema
}