import React, { useEffect, useState } from 'react'
import { ADDRESS, ADDRESS_DEFAULT } from '../constants/constant'
import useAuth from '../axios/useApi';

function Address() {
    const [address, setAddress] = useState([]);
    const authApi = useAuth();
    const [addressUpdated, setAddressUpdated] = useState(false)
    useEffect(() => {
        authApi.get(ADDRESS).then(({ data }) => setAddress(data)).catch(e => console.log(e));
    }, [addressUpdated]);
    const setDefault = (id) => {
        authApi.put(ADDRESS_DEFAULT + id).then((res) => { setAddressUpdated(!addressUpdated) });
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
                    </div>
                </div>
            ))}
        </>
    )
}

export default Address
