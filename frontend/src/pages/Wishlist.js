import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../feature/cartSlice';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../constants/constant';
import Swal from 'sweetalert2';

function Wishlist() {
    const wishlistItems = useSelector((state) => state.cart.wishlist);
    console.log(wishlistItems);
    const dispatch = useDispatch();
    const addToCartHandler = (item) => {
        dispatch(addToCart(item));
        Swal.fire("The item has moved to your cart", "", "success")
    }
    return (
        <div className='container'>
            <h1>Wishlist</h1>
            {wishlistItems?.map((ele, i) => (
                <div className='card my-3' key={i}>
                    <div className='card-body p-3'>
                        <div className='row g-3 justfy-content-center align-items-center'>
                            <div className='col-md-3 d-flex align-items-center'>
                                <img src={IMAGE_URL + ele.image} height="80px" width="80px" alt="track logo" />
                            </div>
                            <Link to={"/icecream-details/" + ele.id} style={{ fontSize: "20px", textDecoration: "none" }} className='col-md-3'>{ele.name}</Link>
                            <span style={{ fontSize: "20px", color: ele.available >= 1 ? "green" : "red" }} className='col-md-3'>{ele.available >= 1 ? "In stock" : "Out of stock"}</span>
                            <button className='btn btn-primary col-md-3' onClick={() => { addToCartHandler(ele); }} >Add to cart</button>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Wishlist
