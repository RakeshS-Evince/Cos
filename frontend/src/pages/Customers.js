import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { CUSTOMERS } from '../constants/constant';


function Customers() {
    const [customers, setCustomers] = useState([]);
    const authApi = useAuth();
    useEffect(() => {
        authApi.get(CUSTOMERS).then(res => setCustomers(res.data)).catch(e => console.log(e.response.data.message));
    }, [authApi]);

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
                                        <button className='btn btn-info me-2' onClick={() => { }}>View More</button>
                                        <button className='btn btn-success' onClick={() => { }}>Edit</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Customers
