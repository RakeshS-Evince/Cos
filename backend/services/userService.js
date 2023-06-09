const { StatusCodes } = require("http-status-codes");
const customerRepository = require("../repository/customerRepository");
const accountRepository = require("../repository/accountRepository");
const addressRepository = require("../repository/addressRepository");
const reviewRepository = require("../repository/reviewRepository");
const ApiError = require("../utils/apiError");
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
    if (!addressData) throw new ApiError(StatusCodes.NOT_FOUND, "This address do not exists")
    return addressData
}
const getOwnReview = async (cid, iid) => {
    const { results, revData } = await reviewRepository.findAllReviewsByCustomerId(cid, iid)
    if (!revData.length) {
        res.send({ fullname: results[0].fullname });
        return
    }
    revData[0].dataValues.fullname = results[0].fullname
    return revData[0]
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
    getOwnReview
}