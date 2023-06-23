import React, { useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';
import ReactCarousel from '../components/ReactCarousel';
import ProductCard from '../components/ProductCard';
import ImageCarousel from '../components/ImageCarousel';
import baner_descont_1 from '../assets/images/baner_descont_1.jpg';
import baner_descont_2 from '../assets/images/baner_descont_2.jpg';
import banner from "../assets/images/banner.jpg";
import banner_2 from "../assets/images/banner_2.jpg";
import banner_3 from "../assets/images/banner_3.jpg";

const categories = [
    { name: "Chocolates" }, { name: "Creams" }, { name: "Fruits" }, { name: "Popsicles" }, { name: "Shakes" }, { name: "Special" }
]

function Home() {
    const { products } = useContext(UserContext);
    return (
        <>
            {/* banner section */}
            <div className='row g-3 justify-content-between'>
                <div className='col-lg-8'>
                    <ImageCarousel images={[banner, banner_2, banner_3]} />
                </div>
                <div className='col-lg-4 d-lg-flex row flex-lg-column justify-content-between'>
                    <div className='p-0 p-md-3 d-none d-md-block col-lg-3 col-md-6-6'>
                        <img src={baner_descont_1} className='' alt="side-banner" />
                    </div>
                    <div className='p-0 p-md-3 d-none d-md-block col-lg-3 col-md-6-6'>
                        <img src={baner_descont_2} className='' alt="side-banner" />
                    </div>
                </div>
            </div>
            {/* features card section */}
            <div className='mb-3'>
                <div className='row g-3 mt-3'>
                    <div className='col-lg-3 col-lg-3 col-md-6-6'>
                        <div className='card'>
                            <div className="p-3 text-center">
                                <i className="bi bi-truck" style={{ fontSize: "35px", color: "#ff6b6b" }}></i>
                                <div className="text-center">
                                    <strong className="">Free Shipping</strong>
                                    <p className="text-muted" style={{ fontSize: "15px" }}>
                                        For all order of $100
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 col-lg-3 col-md-6-6'>
                        <div className='card'>
                            <div className="p-3 text-center">
                                <i className="bi bi-cash-coin" style={{ fontSize: "35px", color: "#ff6b6b" }}></i>
                                <div className="text-center">
                                    <strong className="">Money Back</strong>
                                    <p className="text-muted" style={{ fontSize: "15px" }}>
                                        With a 30 days
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 col-lg-3 col-md-6-6'>
                        <div className='card'>
                            <div className="p-3 text-center">
                                <i className="bi bi-shield-check" style={{ fontSize: "35px", color: "#ff6b6b" }}></i>
                                <div className="text-center">
                                    <strong className="" style={{ fontSize: "15px" }}>Secure Payment</strong>
                                    <p className="text-muted">
                                        Secured payment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 col-lg-3 col-md-6-6'>
                        <div className='card'>
                            <div className="p-3 text-center">
                                <i className="bi bi-headset" style={{ fontSize: "35px", color: "#ff6b6b" }}></i>
                                <div className="text-center">
                                    <strong className="">Online Support</strong>
                                    <p className="text-muted" style={{ fontSize: "15px" }}>
                                        Support 24/7
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* featured category section */}
            <div className='mb-3'>
                <ReactCarousel items={categories} />
            </div>
            {/* featured product section */}
            <div>
                <center>
                    <span className='h3 pb-1' style={{ borderBottom: "3px solid #ff6b6b" }}>Featured Products</span>
                </center>
                <div className='row g-3 mt-3'>
                    <div className='col-lg-3 col-md-6'><ProductCard product={products[Math.floor(Math.random() * products?.length)]} /></div>
                    <div className='col-lg-3 col-md-6'><ProductCard product={products[Math.floor(Math.random() * products?.length)]} /></div>
                    <div className='col-lg-3 col-md-6'><ProductCard product={products[Math.floor(Math.random() * products?.length)]} /></div>
                    <div className='col-lg-3 col-md-6'><ProductCard product={products[Math.floor(Math.random() * products?.length)]} /></div>
                </div>
            </div>

        </>
    )
}

export default Home