import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { MY_ORDERS } from '../constants/constant';
import { Link } from 'react-router-dom';

function UserOrderTable() {
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
            <div className='mb-3'> <strong>My Orders</strong></div>
            <div className='table-responsive'>
                <table className="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Order Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.slice(0, 5)?.map((ele, i) => (
                            <tr key={i}>
                                <td>{ele.id}</td>
                                <td>{ele.date}</td>
                                <td>₹{parseFloat(ele.totalPrice + ele.shippingCharge - ele.couponDiscount).toFixed(2)}</td>
                                <td>{<span className={ele.status === "Placed" ? "text-warning" : ele.status === "Delivered" ? "text-success" : ele.status === "Canceled" ? "text-danger" : ""}>{ele.status}</span>}</td>
                                <td><Link className='text-danger' to={"/my-orders/" + ele.id}>View</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/my-orders" >View all your orders</Link>
            </div>
        </div>
    )
}

export default UserOrderTable
