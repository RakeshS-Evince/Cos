import React, { useEffect, useState } from 'react'
import useAuth from '../../axios/useApi';
import { IMAGE_URL, ORDERS } from '../../constants/constant';
import { useLocation, useParams } from 'react-router-dom';

function CustomerOrders() {
    const [orders, setOrders] = useState([]);
    const { cid } = useParams();
    const { state } = useLocation();
    const authApi = useAuth();
    useEffect(() => {
        authApi.get(ORDERS + cid).then(({ data }) => {
            let reversed = data?.reverse();
            setOrders(reversed)
        }).catch(e => console.log(e.message))
    }, [authApi, cid]);
    return (
        <div>
            <h2>{state?.name + "'s"} Orders</h2>
            {orders.length ? orders?.map((ele, i) => (
                <div className='card my-3' key={i}>
                    <div className='card-body p-3 row g-2'>
                        <div className='d-flex justify-content-between'><h5> Order Id: {ele.id}</h5>
                            <span>Date: {new Date(ele.createdAt).toDateString()}</span>
                        </div>
                        <hr />
                        <div>
                            <div className='row'>
                                {ele?.iceCreams?.map((ele, i) => {
                                    return <>
                                        <div className='d-flex col-sm-3 col-md-2'>
                                            <div className="mx-3">

                                                <img alt="ice cream" src={IMAGE_URL + ele?.image} style={{ height: "50px", width: "50px" }} className="img-sm rounded border" />
                                            </div>
                                            <div className="">
                                                {ele?.name}
                                            </div>
                                        </div>
                                    </>
                                })}
                            </div>
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
            )) : <span>This user has not placed any orders.</span>
            }
        </div>
    )
}

export default CustomerOrders
