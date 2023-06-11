const { StatusCodes } = require('http-status-codes');
const messageRepository = require('../repository/messageRepository');
const iceCreamRepository = require('../repository/iceCreamRepository');
const brandRepository = require("../repository/brandsRepository")
const orderRepository = require("../repository/orderRepository")
const customerRepository = require("../repository/customerRepository");
const reviewRepository = require("../repository/reviewRepository");
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
    findReviewById
}