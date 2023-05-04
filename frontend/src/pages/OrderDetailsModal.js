import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { BASE_URL } from '../constants/constant';
import { Link } from 'react-router-dom';

function OrderDetailsModal({ id, setId }) {
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderAddress, setOrderAddress] = useState(null)
    const authApi = useAuth();

    useEffect(() => {
        authApi.get('order-details/' + id).then(({ data }) => { setOrderDetails(data); setOrderAddress(JSON.parse(data.orderAddress)) }).catch(e => console.log(e.message));
    }, [id])
    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <h5> Order Id: {id}</h5>
                            <hr />
                            {orderDetails?.iceCreams.map((ele, i) => {
                                return (
                                    <div key={i} className="d-flex mb-4">
                                        <div className="me-3 position-relative">
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-info">
                                                {ele.order_item?.quantity}
                                            </span>
                                            <img alt="ice cream" src={BASE_URL + 'images/' + ele.image} style={{ height: "50px", width: "50px" }} className="img-sm rounded border" />
                                        </div>
                                        <div className="">
                                            <Link to="#" className="nav-link">
                                                {ele.name} <br />
                                            </Link>
                                            <div className="price text-muted">Price: ₹ {parseFloat(ele.order_item?.quantity * ele.price).toFixed(2)}</div>
                                        </div>
                                    </div>
                                )
                            })}

                            <h5 className='mt-5'>Shipping details</h5>
                            <hr />
                            <div className='row g-2'>
                                <div className='col-md-4'>
                                    <span style={{ fontSize: '1.25rem' }}>{`${orderAddress?.firstname} ${orderAddress?.lastname}`}</span><br />
                                    <span>{`${orderAddress?.house},${orderAddress?.address} `}</span><br />
                                    <span>{`${orderAddress?.city}, ${orderAddress?.state}`}</span><br />
                                    <span>{` ${orderAddress?.zip}`}</span>
                                </div>

                                <h5 className='mt-5'>Price details</h5>
                                <hr />
                                <div className='mt-3 d-flex justify-content-between'>
                                    <span>Amount</span>
                                    <span>₹ {parseFloat(orderDetails?.totalPrice).toFixed(2)}</span>
                                </div>
                                <div className='mt-3 d-flex justify-content-between'>
                                    <span>Discount</span>
                                    <span className='text-danger'>-₹{parseFloat(orderDetails?.couponDiscount).toFixed(2)}</span>
                                </div>
                                <div className='mt-3 d-flex justify-content-between'>
                                    <span>Shipping Charge</span>
                                    <span>+₹{parseFloat(orderDetails?.shippingCharge).toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className='d-flex justify-content-between'>
                                    <h5> Total</h5>
                                    <h5>₹{parseFloat(orderDetails?.totalPrice + orderDetails?.shippingCharge - orderDetails?.couponDiscount).toFixed(2)}</h5>
                                </div>
                                <div className='d-flex'>
                                    <h5>Payment method :</h5>
                                    <h5>{orderDetails?.paymentMethod}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetailsModal
