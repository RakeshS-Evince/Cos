const { StatusCodes } = require('http-status-codes');
const bcrypt = require("bcrypt");
const messageRepository = require('../repository/messageRepository');
const iceCreamRepository = require('../repository/iceCreamRepository');
const brandRepository = require("../repository/brandsRepository")
const orderRepository = require("../repository/orderRepository")
const customerRepository = require("../repository/customerRepository");
const staffRepository = require('../repository/staffRepository');
const reviewRepository = require("../repository/reviewRepository");
const accountRepository = require('../repository/accountRepository');
const ApiError = require('../utils/apiError');

const getDashBoardDetails = async () => {
    const iceCreamCount = await iceCreamRepository.getIceCreamCount();
    const brandCount = await brandRepository.getBrandsCount();
    const orderSuccessCount = await orderRepository.getOrderSuccessCount();
    const orderPendingCount = await orderRepository.getOrderPendingCount();
    return { iceCreams: iceCreamCount, brands: brandCount, success: orderSuccessCount, pending: orderPendingCount }
}
const findAllMessages = async () => {
    const messageData = await messageRepository.findAllMessages();
    if (!messageData) throw new ApiError(StatusCodes.NOT_FOUND, "No messages found");
    return messageData;
}
const addIceCream = async (data) => {
    const iceCreamData = await iceCreamRepository.createIceCream(data);
    if (!iceCreamData) throw new ApiError(StatusCodes.BAD_REQUEST, "unable to add icecream");
    return { message: "IceCream added successfully " };
}
const updateIceCream = async (id, data) => {
    const iceCreamData = await iceCreamRepository.updateIceCream(data, { id: id });
    if (!iceCreamData) throw new ApiError(StatusCodes.BAD_REQUEST, "unable to update icecream");
    return { message: "IceCream updated successfully " };
}
const deleteIceCream = async (id) => {
    const iceCreamData = await iceCreamRepository.deleteIceCream(id);
    if (!iceCreamData) throw new ApiError(StatusCodes.BAD_REQUEST, "unable to delete icecream");
    return { message: "IceCream deleted successfully " };
}

const addBrand = async (data) => {
    const brandData = await brandRepository.createBrand(data);
    if (!brandData) throw new ApiError(StatusCodes.BAD_REQUEST, "unable to add brand");
    return { message: "Brand added successfully" };
}
const updateBrand = async (data, name) => {
    const brandData = await brandRepository.updateBrand(data, name);
    if (!brandData) throw new ApiError(StatusCodes.BAD_REQUEST, "unable to update brand");
    return { message: "Brand updated successfully" };
}
const deleteBrand = async (name) => {
    const brandData = await brandRepository.deleteBrand(name);
    if (!brandData) throw new ApiError(StatusCodes.BAD_REQUEST, "unable to delete brand");
    return { message: "Brand deleted successfully" };
}
const findAllOrders = async () => {
    const orderData = await orderRepository.findAllOrders();
    if (!orderData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to find all orders");
    return orderData;
}
const updateOrderStatus = async (status, id) => {
    const orderData = await orderRepository.updateOrderStatus(status, id);
    if (!orderData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to update your order status");
    return { message: "Orders status updated successfully" };
}
const findAllOrdersByCustomerId = async (id) => {
    const orderData = await orderRepository.findAllOrdersByCustomerId(id);
    if (!orderData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to find this order");
    return orderData;
}

const findAllCustomers = async () => {
    const cData = await customerRepository.findAllCustomers();
    if (!cData) throw new ApiError(StatusCodes.BAD_REQUEST, "unable to find all customers");
    return cData;
}
const findOneCustomer = async (cid) => {
    const cData = await customerRepository.findOneCustomer(cid);
    if (!cData) throw new ApiError(StatusCodes.BAD_REQUEST, "unable to find this customer");
    return cData;
}
const findAllReviews = async () => {
    const revData = await reviewRepository.findAllReviews();
    if (!revData) throw new ApiError(StatusCodes.BAD_REQUEST, "No reviews found");
    return revData;
}
const findReviewById = async (id) => {
    const revData = await reviewRepository.findReviewById(id);
    if (!revData) throw new ApiError(StatusCodes.BAD_REQUEST, "No reviews found");
    return revData;
}
const createStaff = async (data) => {
    const { username, email, password, contact, fullname } = data;
    const encrypted = await bcrypt.hash(password, 10);
    const accountData = await accountRepository.createAccount({ username, email, password: encrypted, roleId: 2 });
    if (!accountData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to create staff account");
    const staffData = await staffRepository.createStaff({ fullname, email, contact, accountId: accountData.dataValues.id })
    if (!staffData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to create staff account");
    return { message: "Staff account created successfully" };
}
const updateStaff = async (data, id) => {
    let o = Object.keys(data)
        .filter((k) => data[k] !== '')
        .reduce((a, k) => ({ ...a, [k]: data[k] }), {});//for filteration of empty values
    const staffData = await staffRepository.updateStaff(o, id);
    if (!staffData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to update staff data");
    const staffAcountData = await staffRepository.findOneStaff(id);
    if (o.email) {
        const accountData = await accountRepository.updateAccount({ email: o.email }, { id: staffAcountData[0].accountId })
        if (!accountData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to update email on account information")
    }
    if (o.username) {
        const accountData = await accountRepository.updateAccount({ username: o.username }, { id: staffAcountData[0].accountId });
        if (!accountData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to update username on account information")
    }
    return { message: "Staff's information updated" }
}

const findAllStaffs = async () => {
    const staffData = await staffRepository.findAllStaffs();
    if (!staffData) throw new ApiError(StatusCodes.BAD_REQUEST, "unable to find all staff's data");
    return staffData;
}
const findOneStaff = async (id) => {
    const staffData = await staffRepository.findOneStaff(id);
    if (!staffData) throw new ApiError(StatusCodes.BAD_REQUEST, "unable to find staff's data");
    return staffData[0];
}
const deleteStaff = async (id) => {
    const staffData = await accountRepository.deleteAccount(id);
    if (!staffData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to delete this staff");
    return { message: "Staff deleted successfully" }
}


module.exports = {
    findAllMessages,
    updateIceCream,
    addIceCream,
    deleteIceCream,
    addBrand,
    updateBrand,
    deleteBrand,
    findAllOrders,
    findAllOrdersByCustomerId,
    updateOrderStatus,
    findAllCustomers,
    findOneCustomer,
    getDashBoardDetails,
    findAllReviews,
    findReviewById,
    createStaff,
    updateStaff,
    findAllStaffs,
    findOneStaff,
    deleteStaff
}