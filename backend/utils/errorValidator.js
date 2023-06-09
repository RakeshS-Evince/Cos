const ApiError = require("./apiError");
const { StatusCodes } = require("http-status-codes");
const { BaseError } = require("sequelize");
const { JsonWebTokenError } = require("jsonwebtoken");

const CheckErrorType = (err, req, res, next) => {
    let error = err;
    if (err instanceof JsonWebTokenError) {
        if (err.message === "invalid signature") return next(new ApiError(403, "Invalid Authorization"));
        return next(new ApiError(StatusCodes.BAD_REQUEST, "Link expired, Please regenerate link to reset password"));
    }
    if (err.name == "ValidationError") {
        if (err.details[0].type == "string.pattern.base") {
            switch (err.details[0].path[0]) {
                case "password":
                    error = new ApiError(StatusCodes.BAD_REQUEST, "Invalid password");
                    break;
                case "contact":
                    error = new ApiError(StatusCodes.BAD_REQUEST, "Invalid phone");
                    break;
                case "pincode":
                    error = new ApiError(StatusCodes.BAD_REQUEST, "Invalid pincode");
                    break;
                default:
                    error = new ApiError(
                        StatusCodes.BAD_REQUEST,
                        "Unknown Invalid pattern"
                    );
            }
            return next(error)
        } else {
            return next(new ApiError(StatusCodes.BAD_REQUEST, err.message))
        }
    } else if (err instanceof BaseError) {
        if (err.name == "SequelizeUniqueConstraintError") {
            if (Object.keys(err.fields)[0] === "username") {
                next(new ApiError(StatusCodes.BAD_REQUEST, "Username is already in use"));
                return
            }
        }
    }
    else {
        next(error);
    }
};

const apiError = (err, req, res, next) => {
    if (err.statusCode === undefined) {
        res.status(500).send({ message: "Something went wrong!!" });
        throw err;
    }
    res.status(err.statusCode).send({ message: err.message });
};

module.exports = {
    apiError,
    CheckErrorType,
};
