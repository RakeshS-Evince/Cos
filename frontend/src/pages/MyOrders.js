import React, { useEffect, useState } from 'react'
import { IMAGE_URL, MY_ORDERS } from '../constants/constant';
import { Link } from 'react-router-dom';
import useAuth from '../axios/useApi';
import pin from "../assets/images/pin.png"

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const authApi = useAuth();
    useEffect(() => {
        authApi.get(MY_ORDERS).then(({ data }) => {
            let reversed = data?.reverse();
            setOrders(reversed)
        }).catch(e => console.log(e.message))
    }, [authApi]);
    return (
        <div>
            <h2>My Orders</h2>
            {orders?.map((ele, i) => (
                <div className='card my-3' key={i}>
                    <div className='card-body p-3 row g-2'>
                        <div className='d-flex justify-content-between flex-wrap'>
                            <div className='d-flex '>
                                <h5> Order Id: {ele.id}</h5>
                                <div className='ps-3'>
                                    <img src={pin} height="20px" width="20px" alt="track logo" /><Link style={{ textDecoration: "none", marginLeft: "5px" }} to={"/my-orders/" + ele.id}>Track</Link>
                                </div>
                            </div>
                            <span>Date: {new Date(ele.createdAt).toLocaleString()}</span>
                        </div>
                        <hr />
                        <div>
                            <div className='d-flex'>
                                <div className="me-3">
                                    <img alt="ice cream" src={IMAGE_URL + ele.iceCreams[0]?.image} style={{ height: "50px", width: "50px" }} className="img-sm rounded border" />
                                </div>
                                <div className="">
                                    {ele.iceCreams[0]?.name}
                                </div>
                            </div> <br />
                            {ele.iceCreams?.length > 1 && `and ${ele.iceCreams?.length - 1} items more.`} <Link to={"/my-orders/" + ele.id} style={{ textDecoration: "none" }}>View Details</Link>
                        </div>

                        <div className='mt-3 d-flex justify-content-between'>
                            <span>Amount</span>
                            <span>₹ {parseFloat(ele.totalPrice).toFixed(2)}</span>
                        </div>
                        <div className='mt-3 d-flex justify-content-between'>
                            <span>Discount</span>
                            <span className='text-danger'>-₹{parseFloat(ele.couponDiscount).toFixed(2)}</span>
                        </div>
                        <div className='mt-3 d-flex justify-content-between'>
                            <span>Shipping Charge</span>
                            <span>+₹{parseFloat(ele.shippingCharge).toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between'>
                            <h5> Total</h5>
                            <h5>₹{parseFloat(ele.totalPrice + ele.shippingCharge - ele.couponDiscount).toFixed(2)}</h5>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default MyOrders
