const { StatusCodes } = require("http-status-codes");
const customerRepository = require("../repository/customerRepository");
const accountRepository = require("../repository/accountRepository");
const addressRepository = require("../repository/addressRepository");
const reviewRepository = require("../repository/reviewRepository");
const orderRepository = require("../repository/orderRepository");
const paymentRepository = require("../repository/paymentRepository");
const ApiError = require("../utils/apiError");
const Razorpay = require("razorpay");
const crypto = require('crypto');
require('dotenv').config();

const getProfile = async (id) => {
    const profileInfo = await customerRepository.findCustomer(id);
    if (!profileInfo) throw new ApiError(StatusCodes.NOT_FOUND, "Unable to fetch your profile");
    return profileInfo;
}
const updateProfile = async (cid, aid, data) => {
    const dataToUpdate = (({ username, ...rest }) => rest)(data);
    const profileInfo = await customerRepository.updateCustomer(dataToUpdate, { id: cid });
    if (!profileInfo) throw new ApiError(400, "Unable to update your profile");
    if (Object.keys(data).includes("email")) {
        const accountInfo = await accountRepository.updateAccount({ email: data.email }, { id: aid })
    }
    if (Object.keys(data).includes("username")) {
        const accountInfo = await accountRepository.updateAccount({ username: data.username }, { id: aid })
    }
    return { message: "Profile updated successfully" };
}
const getAllAddress = async (id) => {
    const addressData = await addressRepository.findAllAddress(id);
    if (!addressData) throw new ApiError(StatusCodes.NOT_FOUND, "No addresses found")
    return addressData
}
const getOneAddress = async (id) => {
    const addressData = await addressRepository.findOneAddress(id);
    if (!addressData) throw new ApiError(StatusCodes.NOT_FOUND, "No addresses found")
    return addressData
}
const deleteOneAddress = async (id) => {
    const addressData = await addressRepository.deleteAddress(id);
    if (!addressData) throw new ApiError(StatusCodes.NOT_FOUND, "This address do not exists")
    return { message: "Address deleted" }
}
const addOneAddress = async (id, data) => {
    const addressData = await addressRepository.addAddress(id, data);
    if (!addressData) throw new ApiError(StatusCodes.NOT_FOUND, "This address do not exists")
    return { message: "Address added" }
}
const updateOneAddress = async (cid, id, data) => {
    const addressData = await addressRepository.updateAddress(cid, id, data);
    if (!addressData) throw new ApiError(StatusCodes.NOT_FOUND, "This address do not exists")
    return { message: "Address updated" }
}
const makeDefaultAddress = async (cid, id) => {
    const addressData = await addressRepository.makeDefaultAddress(cid, id);
    if (!addressData) throw new ApiError(StatusCodes.NOT_FOUND, "This address do not exists")
    return { message: "Default address updated successfully" }
}
const getDefaultAddress = async (cid) => {
    const addressData = await addressRepository.getDefaultAddress(cid);
    if (!addressData) return null
    return addressData
}
const getOwnReview = async (cid, iid) => {
    const { results, revData } = await reviewRepository.findAllReviewsByCustomerId(cid, iid)
    if (!revData.length) {
        return { fullname: results[0].fullname };
    }
    revData[0].dataValues.fullname = results[0].fullname
    return revData[0]
}
const addRating = async (cid, iid, data) => {
    let orderedICIdArr = [];
    const orderData = await orderRepository.findCustomersOrder(cid);
    orderData?.forEach(element => {
        element?.dataValues?.iceCreams?.forEach(element => {
            orderedICIdArr.push(element?.id)
        })
    })
    if (!Array.from(new Set(orderedICIdArr)).includes(parseInt(iid))) {
        return { message: `You haven't ordered this item, so you can't add review.` };
    }
    const findReviewData = await reviewRepository.findReviewExists(cid, iid);
    if (findReviewData.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Review already exists");
    }
    const addData = await reviewRepository.addReview(cid, iid, data);
    if (!addData) {
        return { message: "Some issue occured while submitting your review" }
    }
    return { message: "Thanks for the review" }
}
const placeOrder = async (orderData, customerId) => {
    let newItems = [];
    orderData?.orderItems?.forEach(element => {
        let find = newItems.findIndex(ele => ele.id === element.id);
        if (find >= 0) {
            let tempObj = { id: element.size?.id, size: element.size?.size, quantity: element?.quantity, price: element.price };
            newItems[find].priceBySizes.push(tempObj)
        } else {
            let tempArr = [];
            let tempObj = { id: element.size?.id, size: element.size?.size, quantity: element?.quantity, price: element.price };
            tempArr.push(tempObj)
            newItems.push(
                {
                    name: element.name,
                    description: element.description,
                    id: element.id,
                    image: element.image,
                    priceBySizes: tempArr
                })
        }
    })
    const info = (({ orderItems, ...rest }) => rest)(orderData);
    let error;
    if (info.paymentMethod == 'prepaid') {
        var instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        })
        var options = {
            amount: (info.totalPrice + info.shippingCharge - info.couponDiscount) * 100,
            receipt: "gurkaran_order_54654",
            currency: "INR",
            payment_capture: '0'
        }
        const order = await instance.orders.create(options);
        if (!order) throw new ApiError(StatusCodes.BAD_REQUEST);
        const paymentData = await paymentRepository.createPendingPayment(order.id);
        const data = await orderRepository.createAnOrder({
            ...info,
            customerId: customerId,
            id: "OD" + new Date().getTime().toString(),
            paymentId: paymentData.dataValues.id
        });
        let items = [];
        for (let i = 0; i < newItems.length; i++) {
            items.push({ orderId: data.dataValues.id, iceCreamId: newItems[i].id, quantity: newItems[i].quantity, additionalInfo: JSON.stringify(newItems[i]?.priceBySizes) })
        }
        const orderItemData = await orderRepository.saveOrderItems(items);
        if (!orderItemData) {
            throw new ApiError(400, "Unable to save place your order due to some invalid items request")
        }
        if (error) throw error
        return { ...order, orderId: data.dataValues.id };

    } else {
        const data = await orderRepository.createAnOrder({
            ...info,
            customerId: customerId,
            id: "OD" + new Date().getTime().toString()
        });
        if (!data) {
            throw new ApiError(StatusCodes.BAD_REQUEST, { message: "Unable to place the order" })
        }
        let items = [];
        for (let i = 0; i < newItems.length; i++) {
            items.push({ orderId: data.dataValues.id, iceCreamId: newItems[i].id, quantity: newItems[i].quantity, additionalInfo: JSON.stringify(newItems[i]?.priceBySizes) })
        }
        const orderItemData = await orderRepository.saveOrderItems(items);
        if (!orderItemData) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to save place your order due to some invalid items request")
        }
        return { orderId: data.dataValues.id }
    }
}
const findUserOrders = async (cid) => {
    const ordersData = await orderRepository.findUserOrders(cid);
    if (!ordersData) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Orders found")
    }
    return ordersData;
}
const findOneOrder = async (cid) => {
    const ordersData = await orderRepository.findOneOrder(cid);
    if (!ordersData) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Order found")
    }
    return ordersData;
}
const verifyPayment = async (paymentInfo, id) => {
    let body = paymentInfo.razorpay_order_id + "|" + paymentInfo.razorpay_payment_id;
    let generated_signature = crypto.createHmac('sha256', '1dEYfpeJ5oMTBiNYM8SLM6kv')
        .update(body.toString())
        .digest('hex');
    if (generated_signature == paymentInfo.razorpay_signature) {
        const data = await paymentRepository.updatePaymentSuccess(paymentInfo.razorpay_order_id);
        if (!data) throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid payment id");
        return process.env.URL + "/#/payment-success/" + id;
    } else {
        return process.env.URL + "/#/payment-failure" + id;
    }
}
const retryPayment = async (paymentInfo, id) => {
    let body = paymentInfo.razorpay_order_id + "|" + paymentInfo.razorpay_payment_id;
    let generated_signature = crypto.createHmac('sha256', '1dEYfpeJ5oMTBiNYM8SLM6kv')
        .update(body.toString())
        .digest('hex');
    if (generated_signature == paymentInfo.razorpay_signature) {
        const data = await paymentRepository.updatePaymentSuccess(paymentInfo.razorpay_order_id);
        if (!data) throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid payment id");
        return process.env.URL + "/#/payment-success/" + id;
    } else {
        return process.env.URL + "/#/payment-failure" + id;
    }
}
const cancelOrder = async (id) => {
    const orderData = await orderRepository.updateOrderStatus("Canceled", id);
    if (!orderData[0]) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to cancel your order");
    return { message: "Your order canceled" };
}


module.exports = {
    getProfile,
    updateProfile,
    getAllAddress,
    getOneAddress,
    deleteOneAddress,
    addOneAddress,
    updateOneAddress,
    makeDefaultAddress,
    getDefaultAddress,
    getOwnReview,
    addRating,
    placeOrder,
    findUserOrders,
    findOneOrder,
    verifyPayment,
    retryPayment,
    cancelOrder
}