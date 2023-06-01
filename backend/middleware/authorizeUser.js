const authorizeUser = async (req, res, next) => {
    try {
        if (parseInt(req.user.roleId) === 3) {
            next();
            return
        }
        res.status(400).send({ message: "You don't have authorization" })
    } catch (e) {
        res.status(400).send({ message: "You don't have authorization" })
    }
}




module.exports = { authorizeUser }