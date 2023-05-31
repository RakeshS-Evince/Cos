import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { CUSTOMERS } from '../constants/constant';
import { useNavigate } from 'react-router-dom';


function Customers() {
    const [customers, setCustomers] = useState([]);
    const [customerInfo, setCustomerInfo] = useState({})
    const authApi = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        authApi.get(CUSTOMERS).then(res => setCustomers(res.data)).catch(e => console.log(e.response.data.message));
    }, [authApi]);
    console.log(customerInfo)

    return (
        <div>
            <h3>
                Customers
            </h3>
            <div className='card'>
                <div className='card-body'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">FullName</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                                <th scope="col">City</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers?.map((ele, i) => (
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{ele.fullname}</td>
                                    <td>{ele.email}</td>
                                    <td>{ele.contact}</td>
                                    <td>{ele.city}</td>
                                    <td>
                                        <button className='btn btn-info me-2' onClick={() => {
                                            setCustomerInfo({
                                                id: ele.id,
                                                fullname: ele.fullname,
                                                email: ele.email,
                                                contact: ele.contact,
                                                city: ele.city,
                                                username: ele.username
                                            })
                                        }} data-bs-toggle="modal" data-bs-target="#cModal">View More</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade" id="cModal" tabIndex="-1" aria-labelledby="cModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cModal">Customer Information</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5 className='pt-3'>Name: {customerInfo?.fullname}</h5>
                            <h5 className='pt-3'>Email: {customerInfo?.email}</h5>
                            <h5 className='pt-3'>Username: {customerInfo?.username}</h5>
                            <h5 className='pt-3'>Contact: {customerInfo?.contact}</h5>
                            <h5 className='pt-3'>City: {customerInfo?.city}</h5>
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-primary' onClick={() => navigate('/customer-orders/' + customerInfo?.id, { state: { name: customerInfo.fullname } })} data-bs-dismiss="modal">View orders</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
