import React, { useEffect, useState } from 'react'
import { ADDRESS, ADDRESS_DEFAULT } from '../constants/constant'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../axios/useApi';

function Address() {
    const [address, setAddress] = useState([]);
    const authApi = useAuth();
    const [addressUpdated, setAddressUpdated] = useState(false)
    useEffect(() => {
        authApi.get(ADDRESS).then(({ data }) => setAddress(data));
    }, [addressUpdated, authApi]);
    const setDefault = (id) => {
        authApi.put(ADDRESS_DEFAULT + id).then((res) => { setAddressUpdated(prev => !prev) });
    }
    const deleteAddress = (id) => {
        Swal.fire({
            title: 'Are you sure to delete this address?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                authApi.delete(ADDRESS + id).then(res => {
                    setAddressUpdated(prev => !prev)
                    Swal.fire(res.data.message);
                }).catch(e => console.log(e.response.data.message));
            }
        })

    }
    return (
        <div>
            <div className='mb-3 d-flex justify-content-between'> <strong>My Addresses</strong>  <Link to={"/address/add"} className='btn btn-danger me-2'>Add</Link></div>
            {address?.length ?
                <div className='row'>
                    {address.map((ele, i) => (
                        <div key={i} className='col-md-6 mt-3'>
                            <div className={ele.default ? `border border-danger rounded p-3` : "border rounded p-3"} style={{ cursor: "pointer" }} onClick={() => { setDefault(ele.id) }} >
                                <div className='py-3'>
                                    <h5>{ele.firstname + " " + ele.lastname}</h5>
                                    <p>{`${ele.address}, ${ele.state}, ${ele.city}, ${ele.zip}`}</p>
                                </div>
                                <div className='p-2'>
                                    <Link to={"/address/edit/" + ele.id} className='btn btn-info me-2'>Edit</Link>
                                    <button className='btn btn-danger' onClick={() => deleteAddress(ele.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> : <div ><span>No addresses are saved, please add one</span></div>}
        </div>
    )
}

export default Address
