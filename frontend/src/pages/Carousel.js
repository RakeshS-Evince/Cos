import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import c_2 from '../assets/images/c_2.jpg'
import c_1 from '../assets/images/c_1.jpg'
import { Link } from 'react-router-dom';

function ImageCarousel() {
    return (
        <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src={c_1} style={{ height: 'calc(100vh - 57px)' }} alt="HOME" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3"  >
                            <h1 className=" text-white text-uppercase mb-3 ">Welcome to Our Ice Cream Shop!</h1>
                            <p>We offer a variety of delicious ice cream flavors made from high-quality ingredients</p>
                            <Link to="/menu"  className='btn btn-sm btn-outline-primary'>Menu</Link>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="w-100" src={c_2} style={{ height: 'calc(100vh - 57px)' }} alt="HOME" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" >
                            <h1 className=" text-white text-uppercase mb-3 ">Welcome to Our Ice Cream Shop!</h1>
                            <p>We offer a variety of delicious ice cream flavors made from high-quality ingredients</p>

                            <Link  to="/menu" className='btn btn-sm btn-outline-primary'>Menu</Link>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default ImageCarousel;