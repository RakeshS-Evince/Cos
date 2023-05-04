import React, { useEffect, useState } from 'react'
import { ADDRESS, ADDRESS_DEFAULT } from '../constants/constant'
import useAuth from '../axios/useApi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Address() {
    const [address, setAddress] = useState([]);
    const authApi = useAuth();
    const [addressUpdated, setAddressUpdated] = useState(false)
    useEffect(() => {
        authApi.get(ADDRESS).then(({ data }) => setAddress(data)).catch(e => console.log(e));
    }, [addressUpdated, authApi]);
    const setDefault = (id) => {
        authApi.put(ADDRESS_DEFAULT + id).then((res) => { setAddressUpdated(!addressUpdated) });
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
                authApi.delete(ADDRESS + '/' + id).then(res => {
                    Swal.fire(res.data.message);
                    setAddressUpdated(!addressUpdated)
                }).catch(e => console.log(e.response.data.message));
            }
        })

    }
    return (
        <>
            {address?.length && address.map((ele, i) => (
                <div key={i} className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <input type='radio' className="form-check-input" name='defaultAddress' checked={ele.default} onChange={() => { setDefault(ele.id) }} />
                            <div className='py-3'>
                                <h5>{ele.firstname + " " + ele.lastname}</h5>
                                <p>{`${ele.address}, ${ele.state}, ${ele.city}, ${ele.zip}`}</p>
                            </div>
                        </div>
                        <div className='p-2'>
                            <Link to={"/address/edit/" + ele.id} className='btn btn-info me-2'>Edit</Link>
                            <button className='btn btn-danger' onClick={() => deleteAddress(ele.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Address
