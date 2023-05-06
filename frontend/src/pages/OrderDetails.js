import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { Link, useParams } from 'react-router-dom';
import './orderDetails.scss'
import { BASE_URL } from '../constants/constant';
import Swal from 'sweetalert2';
function OrderDetails() {
    const [orderDetails, setOrderDetails] = useState(null);
    const [orderAddress, setOrderAddress] = useState(null)
    const authApi = useAuth();
    const { id } = useParams()
    useEffect(() => {
        authApi.get('order-details/' + id).then(({ data }) => { setOrderDetails(data); setOrderAddress(JSON.parse(data.orderAddress)) }).catch(e => console.log(e.message));
    }, [id, authApi])
    const requestCancel = () => {
        Swal.fire({
            title: 'Are you sure to cancel this order?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                authApi.put('/order-status-update/' + id, { status: 'Canceled' }).then((res) => Swal.fire("Your request submitted successfully"));
                window.location.reload();
            }
        })

    }
    return (
        <div>
            <div className='d-flex justify-content-between'><h2>Order details</h2>
            <Link to='/my-orders'>Back to My Orders</Link></div>
            
            
            <div className='card' style={{ zIndex: 0 }}>
                <div className='card-body p-3 row g-2'>
                    <h5> Order Id: {id}</h5>
                    <hr />
                    {orderDetails?.iceCreams?.map((ele, i) => {
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
                    {!(orderDetails?.status === 'Canceled'||orderDetails?.status ==='Delivered')? <button className='btn btn-danger col-auto' onClick={() => { requestCancel() }} >Request Cancel</button>:"" }
                    <h5 className='mt-5'>Shipping details</h5>
                    <hr />
                    <div className='row g-2'>
                        <div className='col-md-4'>
                            <span style={{ fontSize: '1.25rem' }}>{`${orderAddress?.firstname} ${orderAddress?.lastname}`}</span><br />
                            <span>{`${orderAddress?.house},${orderAddress?.address} `}</span><br />
                            <span>{`${orderAddress?.city}, ${orderAddress?.state}`}</span><br />
                            <span>{` ${orderAddress?.zip}`}</span>
                        </div>
                        <div className='col-md-8'>
                            {/* Add class 'active' to progress */}
                            <div className="row d-flex justify-content-center">
                                <div className="col-12">
                                    <ul id="progressbar" className="text-center">
                                        <li className="active step0" />
                                        {orderDetails?.status !== 'Canceled' ? orderDetails?.status === 'Confirmed'
                                            ?
                                            <>
                                                <li className='active step0' />
                                                <li className='step0' />
                                            </>
                                            : orderDetails?.status === 'Delivered'
                                                ?
                                                <>
                                                    <li className='active step0' />
                                                    <li className='active step0' />
                                                </>
                                                :
                                                <>
                                                    <li className='step0' />
                                                    <li className='step0' />
                                                </> : <>
                                            <li className='active step0' />
                                        </>}
                                        
                                    </ul>
                                </div>
                            </div>
                            {orderDetails?.status !== 'Canceled' ? <div className="row d-flex justify-content-center">
                                <div className="col-12">
                                    <ul id="sub-progressbar" className="text-center">
                                        <li className=" ">Placed</li>
                                        <li className=" ">Conifrmed</li>
                                        <li className="" >Delivered</li>
                                    </ul>
                                </div>
                            </div> : <div className="row d-flex justify-content-center">
                                <div className="col-12">
                                    <ul id="sub-progressbar" className="text-center">
                                        <li className=" ">Placed</li>
                                        <li className=" ">Canceled</li>
                                    </ul>
                                </div>
                            </div>}
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

    )
}

export default OrderDetails
