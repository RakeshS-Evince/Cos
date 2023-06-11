const { StatusCodes } = require("http-status-codes");
const iceCreamRepository = require("../repository/iceCreamRepository");
const brandRepository = require("../repository/brandsRepository");
const messageRepository = require("../repository/messageRepository");
const reviewRepository = require("../repository/reviewRepository");
const ApiError = require("../utils/apiError");

const findAllIcecream = async () => {
    const iceCreamData = await iceCreamRepository.getAllIceCream();
    if (!iceCreamData) throw new ApiError(StatusCodes.NOT_FOUND, "No Ice-creams found");
    return iceCreamData;
}
const findIceCreamsByBrands = async (brandName) => {
    const iceCreamData = await iceCreamRepository.getAllIceCreamByBrand(brandName);
    if (!iceCreamData) throw new ApiError(StatusCodes.NOT_FOUND, "No Ice-creams found");
    return iceCreamData;
}
const findIceCreamsById = async (id) => {
    const iceCreamData = await iceCreamRepository.getOneIceCream(id);
    if (!iceCreamData) throw new ApiError(StatusCodes.NOT_FOUND, "No Ice-creams found");
    return iceCreamData;
}
const findAllBrands = async () => {
    const brandsData = await brandRepository.getAllBrands();
    if (!brandsData) throw new ApiError(StatusCodes.NOT_FOUND, "No brands found");
    return brandsData;
}
const postMessage = async (data) => {
    const messageData = await messageRepository.saveMessage(data);
    if (!messageData) throw new ApiError(StatusCodes.BAD_REQUEST, "Unable to send your message");
    return { message: "Your message submitted" }
}
const getAllReviewsByIid = async (id) => {
    const data = await reviewRepository.findAllReviewsByIceCreamId(id);
    if (!data) throw new ApiError(StatusCodes.NOT_FOUND, "No reviews found");
    let totalRating = data[0].dataValues?.rating;
    for (let i = 1; i < data.length; i++) {
        totalRating += data[i].dataValues.rating
    }
    return { averageRating: totalRating / data.length, data: data }
}


module.exports = {
    findAllIcecream,
    findIceCreamsByBrands,
    findIceCreamsById,
    findAllBrands,
    postMessage,
    getAllReviewsByIid
}