const authService = require('../services/authService')

const register = async (req, res, next) => {
    try {
        const data = await authService.createAccount(req.body)
        res.send(data)
    } catch (e) { next(e) }
}
const login = async (req, res, next) => {
    try {
        const data = await authService.login(req.body);
        res.send(data);
    } catch (e) { next(e) }
}
const forgotPassword = async (req, res, next) => {
    try {
        const data = await authService.forgotPassword(req.body);
        res.send(data);
    } catch (e) { next(e) }
}
const resetPassword = async (req, res, next) => {
    try {
        const data = await authService.resetPassword(req.body, req.user.id);
        res.send(data);
    } catch (e) { next(e) }
}

module.exports = { login, register, forgotPassword, resetPassword }