const { StatusCodes } = require("http-status-codes");
const iceCreamRepository = require("../repository/iceCreamRepository");
const brandRepository = require("../repository/brandsRepository");
const categoryRepository = require("../repository/categoryRepository");
const sizeRepository = require("../repository/sizeRepository");
const messageRepository = require("../repository/messageRepository");
const reviewRepository = require("../repository/reviewRepository");
const ApiError = require("../utils/apiError");

const findAllIcecream = async () => {
    const iceCreamData = await iceCreamRepository.getAllIceCream();
    const minMax = await iceCreamRepository.findMinMax();
    let tempData = iceCreamData.map(ele => {
        if (ele.dataValues.sizes.length) {
            let sizeArr = [];
            ele.dataValues.sizes.forEach(element => {
                sizeArr.push(element.size)
            });
            ele.dataValues.sizes = sizeArr;
        };
        if (ele.dataValues.reviews.length) {
            let avgRating = 0;
            ele.dataValues.reviews.forEach(element => {
                avgRating += element.dataValues.rating
            });
            ele.dataValues.averageRating = avgRating / ele.dataValues.reviews.length;
        }
        delete ele.dataValues.reviews
        return ele.dataValues;
    })
    if (!iceCreamData) throw new ApiError(StatusCodes.NOT_FOUND, "No Ice-creams found");
    return { data: tempData, max: minMax[0].dataValues.maxPrice, min: minMax[0].dataValues.minPrice }
};

const findIceCreamsByBrands = async (brandName) => {
    const iceCreamData = await iceCreamRepository.getAllIceCreamByBrand(brandName);
    if (!iceCreamData) throw new ApiError(StatusCodes.NOT_FOUND, "No Ice-creams found");
    let tempData = iceCreamData.map(ele => {
        if (ele.dataValues.sizes.length) {
            let sizeArr = [];
            ele.dataValues.sizes.forEach(element => {
                sizeArr.push(element.size)
            });
            ele.dataValues.sizes = sizeArr;
        };
        if (ele.dataValues.reviews.length) {
            let avgRating = 0;
            ele.dataValues.reviews.forEach(element => {
                avgRating += element.dataValues.rating
            });
            ele.dataValues.averageRating = avgRating / ele.dataValues.reviews.length;
        }
        delete ele.dataValues.reviews
        return ele.dataValues;
    })
    return tempData;
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
    if (!data.length) return { averageRating: 0, data: [] }
    let totalRating = data[0].dataValues?.rating;
    for (let i = 1; i < data.length; i++) {
        totalRating += data[i].dataValues.rating
    }
    return { averageRating: totalRating / data.length, data: data }
}
const getFilterOptions = async () => {
    const categories = await categoryRepository.findAllCategory();
    const brands = await brandRepository.getAllBrands();
    const sizes = await sizeRepository.findAllSizes();
    return { sizes, brands, categories }
}


module.exports = {
    findAllIcecream,
    findIceCreamsByBrands,
    findIceCreamsById,
    findAllBrands,
    postMessage,
    getAllReviewsByIid,
    getFilterOptions
}