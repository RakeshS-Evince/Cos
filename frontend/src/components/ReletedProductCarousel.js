import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from 'react'
import ProductCard from "./ProductCard";
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};
export const ReletedProductCarousel = ({ items }) => {
    return (
        <div>
            <Carousel responsive={responsive}>
                {items?.map((element, index) => (
                    <div key={index} className='m-2'  >
                        <ProductCard product={element} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ReletedProductCarousel


