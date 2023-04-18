const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user;
        jwt.verify(token, 'secretKey', (err, decoded) => {
            user = decoded
        })
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ message: e.message })
    }
}
module.exports = { verifyAuth }