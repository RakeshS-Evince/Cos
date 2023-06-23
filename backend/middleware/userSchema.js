const Joi = require("joi");
const profileUpdateSchema = (req, res, next) => {
    if (req.body.newPassword) {
        const schema = Joi.object({
            fullname: Joi.string().min(5).max(30).optional(),
            username: Joi.string().min(5).max(30).optional(),
            email: Joi.string().email().optional(),
            contact: Joi.string().min(10).max(13).pattern(new RegExp("^\\d{3}[ -]?\\d{3}[ -]?\\d{4}$")).optional(),
            oldPassword: Joi.string().required(),
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
            next(error);
            return
        }
        next()
    } else {
        const schema = Joi.object({
            fullname: Joi.string().min(5).max(30).optional(),
            username: Joi.string().min(5).max(30).optional(),
            email: Joi.string().email().optional(),
            contact: Joi.string().min(10).max(13).pattern(new RegExp("^\\d{3}[ -]?\\d{3}[ -]?\\d{4}$")).optional(),
            oldPassword: Joi.string().allow(""),
            newPassword: Joi.string().allow(""),
            confirmPassword: Joi.string().allow(""),
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

};
module.exports = {
    profileUpdateSchema
}