
const isAdminOrStaff = async (req, res, next) => {
    try {
        if (parseInt(req.user.roleId) === 3) {
            next();
            return
        }
        if (parseInt(req.user.roleId) === 2) {
            // let reqUrl = req.originalUrl?.split("/")[1]
            // if (reqUrl === "staff" || reqUrl === "customer" || reqUrl === "review") {
            //     res.status(403).send({ message: "You don't have authorization" });
            //     return
            // }
            next();
            return
        }
        res.status(403).send({ message: "You don't have authorization" })
    } catch (e) {
        res.status(403).send({ message: "You don't have authorization" })
    }
}
const isAuthenticated = (req, res, next) => {
    if (req.user) return next()
    res.status(401).send({ message: "Unauthorized" })
}




module.exports = { isAdminOrStaff, isAuthenticated }