const jwt = require("jsonwebtoken");
const ApiError = require('../utils/apiError');
const verifyAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return next(new ApiError(403, "No auth token"))
    jwt.verify(token, process.env.AUTH_SECRET, (error, user) => {
        if (error) return next(error)
        req.user = user;
    })
    return next();
}

module.exports = { verifyAuth }