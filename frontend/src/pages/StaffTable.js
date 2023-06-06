import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { Link } from 'react-router-dom';

function StaffTable() {
    const [customers, setCustomers] = useState([]);
    const authApi = useAuth();
    useEffect(() => {
        authApi.get('/staff').then(res => setCustomers(res.data)).catch(e => console.log(e.response.data.message));
    }, [authApi]);
    return (
        <div>
            <div className='d-flex my-2'>
                <h3>
                    Staff
                </h3>
                <Link to="/staff/add" className='btn btn-primary ms-3'>Add</Link>
            </div>

            <div className='card'>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">FullName</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Username</th>
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
                                        <td>{ele.username}</td>
                                        <td><Link to={'/staff/edit/' + ele.id} className='btn btn-primary'>Edit</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffTable
