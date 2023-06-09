const Joi = require("joi");
const profileUpdateSchema = (req, res, next) => {
    const schema = Joi.object({
        fullname: Joi.string().min(5).max(30).optional(),
        username: Joi.string().min(5).max(30).optional(),
        email: Joi.string().email().optional(),
        contact: Joi.string().min(10).max(13).pattern(new RegExp("^\\d{3}[ -]?\\d{3}[ -]?\\d{4}$")).optional(),
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
module.exports = {
    profileUpdateSchema
}