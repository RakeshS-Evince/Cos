import React, { useEffect, useState } from 'react'
import useAuth from '../axios/useApi';
import { Link } from 'react-router-dom';
import { STAFF } from '../constants/constant';
import Swal from 'sweetalert2';

function StaffTable() {
    const [customers, setCustomers] = useState([]);
    const [refetchData, setRefetchData] = useState(false);
    const authApi = useAuth();
    useEffect(() => {
        authApi.get(STAFF).then(res => setCustomers(res.data)).catch(e => console.log(e.response.data.message));
    }, [authApi, refetchData]);
    const toggleRefetchData = () => {
        setRefetchData(!refetchData)
    }
    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Do you want to delete this staff?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {

            if (result.isConfirmed) {
                authApi.delete(STAFF + id).then((res) => {
                    res && Swal.fire(res?.data.message, "", 'success');
                    toggleRefetchData();
                }).catch(e => {
                    console.log(e.response.data.message)
                })
            }
        })
    }
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
                                        <td><Link to={'/staff/edit/' + ele.id} className='btn btn-primary'>Edit</Link>
                                            <button className='btn btn-danger ms-2' onClick={() => { deleteHandler(ele.accountId) }}>Delete</button>
                                        </td>
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
