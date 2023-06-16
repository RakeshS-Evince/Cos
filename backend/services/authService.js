const { sendMail } = require('./emailService');
const { StatusCodes } = require('http-status-codes');
const ApiError = require("../utils/apiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accountRepo = require("../repository/accountRepository");
const customerRepo = require("../repository/customerRepository");

const createAccount = async ({ email, password, contact, fullname, username }) => {
    const encrypted = await bcrypt.hash(password, 10);
    const accountInfo = await accountRepo.createAccount({ email, password: encrypted, username, roleId: 1 });
    if (!accountInfo) {
        throw new ApiError(400, "Unable to create account");
    }
    const customerInfo = await customerRepo.createCustomer({ fullname, contact, email, accountId: accountInfo.dataValues.id });
    if (!customerInfo) {
        throw new ApiError(400, "Unable to create account");
    }
    return { message: "Account created successfully" }
}
const login = async ({ username, password }) => {
    const accountData = await accountRepo.findAccountByUsername(username);
    if (!accountData) throw new ApiError(StatusCodes.NOT_FOUND, "User is not registered");
    const isMatched = await bcrypt.compare(password, accountData.dataValues.password);
    if (!isMatched) throw new ApiError(StatusCodes.BAD_REQUEST, "Incorrect password");
    if (accountData.dataValues.roleId === 1) {
        const customerData = await customerRepo.findCustomerId(accountData.dataValues.id);
        if (!customerData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to fetch your data");
        let token = jwt.sign({
            accountId: accountData.dataValues.id,
            roleId: accountData.dataValues.roleId,
            customerId: customerData.dataValues.id,
            customerName: customerData.dataValues.fullname
        }, process.env.AUTH_SECRET, { expiresIn: "24h" })

        return { message: 'Login successful', username: accountData.dataValues.username, token: token, id: customerData.dataValues.id };
    }
    let token = jwt.sign({
        accountId: accountData.dataValues.id,
        roleId: accountData.dataValues.roleId
    }, process.env.AUTH_SECRET, { expiresIn: "24h" })
    return { message: 'Login successful', username: accountData.dataValues.username, token: token };
}
const forgotPassword = async ({ email }) => {
    const accountData = await accountRepo.findAccountByEmail(email);
    if (!accountData) throw new ApiError(StatusCodes.NOT_FOUND, "Email not found");
    const token = jwt.sign({ id: accountData.dataValues.id }, process.env.AUTH_SECRET, { expiresIn: "5m" });
    sendMail(token, accountData.dataValues.email);
    return { message: 'An email sent to reset your password, please check your email' }
}
const resetPassword = async ({ newPassword }, id) => {
    const encrypted = await bcrypt.hash(newPassword, 10);
    const accountData = await accountRepo.updateAccount({ password: encrypted }, { id })
    if (!accountData[0]) throw new ApiError(400, "Unable to update your password");
    return { message: "Password updated successfully" };
}
const createAccountFromGoogle = async ({ email, fullname, name }) => {
    const accountExists = await accountRepo.findAccountByEmail(email);
    if (accountExists) {
        const customer = await customerRepo.findCustomer(accountExists.dataValues.id);
        let token = jwt.sign({
            accountId: accountExists?.dataValues.id,
            roleId: accountExists?.dataValues.roleId,
            customerId: customer?.id,
            customerName: customer?.fullname
        }, process.env.AUTH_SECRET, { expiresIn: "24h" })
        return { message: 'Login successful', username: accountExists.dataValues.username, token: token, id: customer.id }
    }
    const encrypted = await bcrypt.hash(name + "@123", 10);
    const accountInfo = await accountRepo.createAccount({ email, username: "user_" + name, password: encrypted, roleId: 1 });
    if (!accountInfo) {
        throw new ApiError(400, "Unable to create account");
    }
    const customerInfo = await customerRepo.createCustomer({ fullname, email, accountId: accountInfo.dataValues.id });
    if (!customerInfo) {
        throw new ApiError(400, "Unable to create account");
    }
    let token = jwt.sign({
        accountId: accountInfo?.dataValues.id,
        roleId: accountInfo?.dataValues.roleId,
        customerId: customerInfo?.dataValues.id,
        customerName: customerInfo?.dataValues.fullname
    }, process.env.AUTH_SECRET, { expiresIn: "24h" })
    return { message: 'Login successful', username: accountInfo.dataValues.username, token: token, id: customerInfo.dataValues.id }
}

module.exports = { createAccount, login, forgotPassword, resetPassword, createAccountFromGoogle }